<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()
const runtimeConfig = useRuntimeConfig()

const title = ref(
  `${runtimeConfig.public.appName} - Revolucione suas vendas com automação de WhatsApp!`
)

const code = route?.params?.code
const codeString = Array.isArray(code) ? code[0] : code

await authStore.validateCode(codeString || "")

definePageMeta({
  layout: "auth",
})

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <div>Aguardando autenticar a conexão...</div>
</template>
