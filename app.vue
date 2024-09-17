<script setup lang="ts">
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
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />

    <UMain class="overflow-x-hidden">
      <NuxtLayout>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </NuxtLayout>
    </UMain>

    <UModals />
    <USlideovers />
    <UNotifications :ui="{ strategy: 'override', position: 'top-0 right-0' }" />
  </div>
</template>
