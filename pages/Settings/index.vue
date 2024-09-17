<script setup>
const runtimeConfig = useRuntimeConfig()
const title = ref(`${runtimeConfig.public.appName} - Configurações`)

definePageMeta({
  layout: "dashboard",
})

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <main>settings</main>
</template>
