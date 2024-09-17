// https://nuxt.com/docs/api/configuration/nuxt-config
import wasm from "vite-plugin-wasm";

export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@nuxthub/core",
  ],

  css: ["~/assets/scss/main.scss"],
  ssr: false,
  hub: {
    blob: true,
    ai: true,
    remote: Boolean(process.env.NUXT_HUB_BLOB_REMOTE),

    projectUrl({ env, branch }) {
      // Select the preview URL from the dev branch
      if (env === "preview") {
        return process.env.NUXT_HUB_BLOB_PREVIEW;
      }
      return process.env.NUXT_HUB_BLOB_PRODUCTION;
    },
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      apiBase: process.env.BASE_URL,
      apiBaseServer: process.env.API_BASE_URL,

      sentry: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.SENTRY_ENV,
      },
    },
  },

  typescript: {
    strict: false,
    tsConfig: {
      compilerOptions: {
        types: ["types"],
      },
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  colorMode: {
    preference: "light",
  },

  googleFonts: {
    display: "swap",
    preload: true,
    download: true,
    base64: true,
    inject: true,
    families: {
      Sora: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
  vite: {
    plugins: [wasm()],
  },
  compatibilityDate: "2024-08-03",
});
