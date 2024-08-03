import { sentryVitePlugin } from "@sentry/vite-plugin";

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
  ssr: true,
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      sentryEnv: process.env.SENTRY_ENVIRONMENT,
      sentryDns: process.env.SENTRY_DNS,
      SENTRY_TRACES_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0"
      ),
      SENTRY_REPLAY_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_REPLAY_SAMPLE_RATE ?? "0"
      ),
      SENTRY_ERROR_REPLAY_SAMPLE_RATE: parseFloat(
        process.env.SENTRY_ERROR_REPLAY_SAMPLE_RATE ?? "0"
      ),
    },
  },
  sourcemap: true,
  vite: {
    plugins: [
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
      }),
    ],
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
});
