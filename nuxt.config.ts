// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    "@nuxtjs/google-fonts",
    "@nuxthub/core"
  ],
  css: [
    '~/assets/scss/main.scss',
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      apiBase:  process.env.API_BASE_URL,
    }
  },
  typescript: {
    strict: false,
    tsConfig: {
      compilerOptions: {
        types: [
          'types'
        ]
      }
    }
  },

  devtools: {
    enabled: false,
    timeline: {
      enabled: true,
    },
  },
  colorMode: {
    preference: 'light'
  },
  googleFonts: {
    display: "swap",
    preload: true,
    download: true,
    base64: true,
    inject: true,
    families: {
      Sora: [100, 200, 300, 400, 500, 600, 700, 800],
    }
  },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
})
