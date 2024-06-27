// https://nuxt.com/docs/api/configuration/nuxt-config
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    "@nuxtjs/google-fonts",
    "@nuxthq/studio",
    "@nuxthub/core"
  ],
  css: [
    '~/assets/css/main.css',
  ],
  ssr: true,
  typescript: {
    strict: false
  },

  devtools: {
    enabled: true,
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
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/',
        '/confirm',
        '/login',
        '/dashboard',
        '/order/complete',
        '/order/checkout'
      ],
      cookieRedirect: true
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
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
  runtimeConfig: {
    public: {
        SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC,
        SENTRY_TRACES_SAMPLE_RATE: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE ?? '0'),
        SENTRY_REPLAY_SAMPLE_RATE: parseFloat(process.env.SENTRY_REPLAY_SAMPLE_RATE ?? '0'),
        SENTRY_ERROR_REPLAY_SAMPLE_RATE: parseFloat(process.env.SENTRY_ERROR_REPLAY_SAMPLE_RATE ?? '0'),
    },
  },
  sourcemap: true,
  vite: {
      plugins: [
          sentryVitePlugin({
              authToken: process.env.SENTRY_AUTH_TOKEN,
              org: "gearbox",
              project: "abc-website-frontend",
          }),
      ],
  },
})
