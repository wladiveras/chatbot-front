<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
useSeoMeta({
  title:
    runtimeConfig.public.appName + "- Revolucione suas vendas com automação de WhatsApp!",
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
