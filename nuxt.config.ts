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
  css: ["~/assets/css/main.css"],
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
      include: ["@unhead/schema-org/vue", "zod"],
    },
  },
  ui: {
    fonts: false,
    colorMode: false,
    authForm: {
      slots: {
        otp: "w-full",
      },
    },
  },
  axios: {
    baseUrl: "https://localhost:8000/api/v1/",
  },
  toast: {},
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
