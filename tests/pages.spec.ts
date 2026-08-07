import { test, expect } from "@playwright/test";
import { products } from "../src/data/products";

const staticPages = [
  { url: "/", title: "scubadeving — software for serious divers" },
  { url: "/privacy", title: "Privacy Policy — scubadeving" },
];

const productPages = products.map((p) => ({
  url: `/${p.id}`,
  title: `${p.name} — ${p.tagline}`,
  name: p.name,
}));

// All pages load with correct titles
for (const { url, title } of [...staticPages, ...productPages]) {
  test(`${url} loads with correct title`, async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveTitle(title);
  });
}

// 404 page
test("unknown route renders 404 page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.locator("main h1")).toContainText("Page not found");
});

// Product pages render the product name in the h1
for (const { url, name } of productPages) {
  test(`${url} shows product name in heading`, async ({ page }) => {
    await page.goto(url);
    await expect(page.locator("main h1")).toContainText(name);
  });
}

// Homepage product cards link to product pages
for (const { id, name } of products) {
  test(`homepage card for ${name} navigates to /${id}`, async ({ page }) => {
    await page.goto("/");
    await page.click(`a[href="/${id}"]`);
    await expect(page).toHaveURL(`/${id}`);
  });
}

// Back navigation from product pages
test("back link returns to homepage", async ({ page }) => {
  await page.goto(`/${products[0].id}`);
  await page.click('a[href="/"]');
  await expect(page).toHaveURL("/");
});

// Cross-links between products
test("cross-link navigates between product pages", async ({ page }) => {
  const [first, second] = products;
  await page.goto(`/${first.id}`);
  await page.click(`a[href="/${second.id}"]`);
  await expect(page).toHaveURL(`/${second.id}`);
  await expect(page.locator("main h1")).toContainText(second.name);
});

// Privacy link in footer
test("footer privacy link navigates to /privacy", async ({ page }) => {
  await page.goto("/");
  await page.click('footer a[href="/privacy"]');
  await expect(page).toHaveURL("/privacy");
});
