<script setup lang="ts">
import "./RegisterServiceWorker"

const runtimeConfig = useRuntimeConfig()

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [
    { rel: "icon", href: "/favicon.png" },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
    },
  ],

  htmlAttrs: {
    lang: "pt",
  },
})

if (
  import.meta.client &&
  process.env.NODE_ENV === "production" &&
  runtimeConfig.public.sentry.dsn
) {
  useHead({
    script: [
      {
        src: runtimeConfig.public.sentry.dsn,
        crossorigin: "anonymous",
      },
    ],
  })
}

useSeoMeta({
  ogImage: "https://landing-template.nuxt.dev/social-card.png",
  twitterImage: "https://landing-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
})
</script>

<template>
  <div>
    <!-- <UAlert
      icon="i-heroicons-command-line"
      description="Bem-vindo(a) ao MarinaBot! Estamos na fase BETA e estamos ansiosos para receber seu feedback. Entre em contato com o suporte para relatar bugs ou sugerir melhorias. Juntos, podemos tornar o MarinaBot ainda melhor!"
      title="MARINABOT BETA"
      color="primary"
      :ui="{
        rounded: 'rounded-none',
      }"
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'white',
        variant: 'link',
        padded: false,
      }"
    /> -->
    <NuxtLoadingIndicator />
    <UMain class="overflow-x-hidden">
      <NuxtLayout>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </NuxtLayout>
    </UMain>

    <UModals />
    <UNotifications :ui="{ strategy: 'override', position: 'bottom-0 left-1/3' }" />
  </div>
</template>
