import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { isSitemapPage } from "./src/data/sitemap.ts";

export default defineConfig({
  site: "https://scubadeving.com",
  integrations: [sitemap({ filter: isSitemapPage })],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
