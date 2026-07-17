export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/seo"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Skeleton - ",
      htmlAttrs: {
        lang: "fa",
        dir: "ltr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8000/api",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
});
