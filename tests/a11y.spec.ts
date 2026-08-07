import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { products } from "../src/data/products";

const allPages = [
  "/",
  "/privacy",
  ...products.map((p) => `/${p.id}`),
];

for (const url of allPages) {
  test(`${url} has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
