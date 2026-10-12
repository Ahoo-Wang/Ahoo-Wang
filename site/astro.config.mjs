// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://i.ahoo.me",
  // A github.io project page is served under /<repo>; the deploy workflow sets
  // this from actions/configure-pages. A custom domain leaves it empty.
  base: process.env.BASE_PATH || "/",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", zh: "zh-CN" } },
      filter: (page) => !page.includes("/404"),
    }),
  ],
  build: { inlineStylesheets: "auto" },
});
