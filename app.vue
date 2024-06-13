<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.png" }],
  htmlAttrs: {
    lang: "en",
  },
})

useSeoMeta({
  ogImage: "https://landing-template.nuxt.dev/social-card.png",
  twitterImage: "https://landing-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <UMain>
      <NuxtLayout>
        <UContainer>
          <NuxtPage />
        </UContainer>
      </NuxtLayout>
    </UMain>

    <UModals />
    <UNotifications />
  </div>
</template>
