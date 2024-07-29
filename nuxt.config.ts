// https://nuxt.com/docs/api/configuration/nuxt-config
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
    '~/assets/scss/main.scss',
  ],
  ssr: true,
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
        '/order/checkout',
        '/connections',
        '/connections/*',
        '/flows',
        '/flows/*',
        '/plans',
        '/settings'
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
})
