import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { discordUrl, hydrovaultDiscordUrl, looplogicDiscordUrl } from "../src/data/site";
import { isSitemapPage } from "../src/data/sitemap";

const redirects = [
  { path: "/discord", target: discordUrl, channel: "#introductions" },
  { path: "/looplogic/discord", target: looplogicDiscordUrl, channel: "#looplogic-feedback" },
  { path: "/hydrovault/discord", target: hydrovaultDiscordUrl, channel: "#hydrovault-feedback" },
];

for (const { path, target, channel } of redirects) {
  test(`${path} sends people to ${channel} and says where they are going`, async ({ request }) => {
    const html = await (await request.get(path)).text();

    expect(html).toContain(`<meta http-equiv="refresh" content="0; url=${target}">`);
    expect(html).toContain(`href="${target}"`);
    expect(html).toContain(channel);
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
  });

  test(`${path} has no WCAG 2.1 AA violations`, async ({ page }) => {
    // The page redirects at once, which would end the check mid-way, so serve it without the refresh tag.
    // The test above checks that the tag is there.
    await page.route(/\/discord\/?$/, async (route) => {
      const response = await route.fetch();
      const body = (await response.text()).replace(/<meta http-equiv="refresh"[^>]*>/, "");
      await route.fulfill({ response, body });
    });
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

test("the redirect pages are filtered out of the sitemap and real pages are kept", () => {
  for (const { path } of redirects) {
    expect(isSitemapPage(`https://scubadeving.com${path}/`)).toBe(false);
  }
  for (const path of ["/", "/looplogic/", "/looplogic/privacy/", "/hydrovault/support/"]) {
    expect(isSitemapPage(`https://scubadeving.com${path}`)).toBe(true);
  }
});
