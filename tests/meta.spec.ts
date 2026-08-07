import { test, expect } from "@playwright/test";
import { products } from "../src/data/products";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const meta = (page: import("@playwright/test").Page, attr: string, value: string) =>
  page.locator(`meta[${attr}="${value}"]`).getAttribute("content");

const linkHref = (page: import("@playwright/test").Page, rel: string) =>
  page.locator(`link[rel="${rel}"]`).getAttribute("href");

// ─── og:image ─────────────────────────────────────────────────────────────────
test("homepage og:image is absolute and uses default image", async ({ page }) => {
  await page.goto("/");
  const url = await meta(page, "property", "og:image");
  expect(url).toMatch(/^https?:\/\//);
  expect(url).toContain("og-default.png");
});

for (const { id } of products) {
  test(`/${id} og:image is absolute and product-specific`, async ({ page }) => {
    await page.goto(`/${id}`);
    const url = await meta(page, "property", "og:image");
    expect(url).toMatch(/^https?:\/\//);
    expect(url).toContain(`og-${id}.png`);
  });
}

// ─── og:image dimensions ──────────────────────────────────────────────────────
test("og:image dimensions are declared", async ({ page }) => {
  await page.goto("/");
  expect(await meta(page, "property", "og:image:width")).toBe("1200");
  expect(await meta(page, "property", "og:image:height")).toBe("630");
});

// ─── og:title / og:description consistency ────────────────────────────────────
const allPages = ["/", "/privacy", ...products.map((p) => `/${p.id}`)];

for (const url of allPages) {
  test(`${url} og:title matches page title`, async ({ page }) => {
    await page.goto(url);
    const title = await page.title();
    const ogTitle = await meta(page, "property", "og:title");
    expect(ogTitle).toBe(title);
  });

  test(`${url} has non-empty description`, async ({ page }) => {
    await page.goto(url);
    const desc = await meta(page, "name", "description");
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(20);
  });
}

// ─── Canonical URL ────────────────────────────────────────────────────────────
test("canonical URL is absolute", async ({ page }) => {
  await page.goto("/");
  const href = await linkHref(page, "canonical");
  expect(href).toMatch(/^https?:\/\//);
});

// ─── Twitter card ─────────────────────────────────────────────────────────────
test("twitter:card is summary_large_image when og:image is present", async ({ page }) => {
  await page.goto("/");
  const card = await meta(page, "name", "twitter:card");
  expect(card).toBe("summary_large_image");
});
