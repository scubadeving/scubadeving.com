// The /discord pages only redirect, so they stay out of the sitemap.
export const isSitemapPage = (page: string): boolean => !page.endsWith("/discord/");
