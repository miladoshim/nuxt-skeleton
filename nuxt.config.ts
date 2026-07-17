export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxtjs/seo",
    "nuxt-swiper",
    "@nuxtjs/device",
    "nuxt-easy-lightbox",
    // "@nuxtjs/html-validator",
    "nuxt-csurf",
    "nuxt-tiptap-editor",
    "@dargmuesli/nuxt-cookie-control",
    "@nuxt/icon",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
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
    strict: false,
    typeCheck: false,
    shim: false,
  },
  vite: {
    optimizeDeps: {
      include: ["@unhead/schema-org/vue"],
    },
  },
  ui: {
    fonts: false,
    colorMode: false,
  },
  image: {
    presets: {
      avatar: {
        modifiers: {
          format: "webp",
          width: 50,
          height: 50,
        },
      },
    },
  },
});