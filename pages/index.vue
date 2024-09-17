<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const title = ref(
  `${runtimeConfig.public.appName} - Revolucione suas vendas com automação de WhatsApp!`
)

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <LandingHeader />
  <LandingFeatures />
  <LandingPlans />
  <LandingTestimonial />
  <LandingFaq />
  <LandingPromotion />
</template>
