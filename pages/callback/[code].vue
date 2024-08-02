<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()

const code = route?.params?.code
const codeString = Array.isArray(code) ? code[0] : code

await authStore.validateCode(codeString || "")

definePageMeta({
  layout: "auth",
})
</script>

<template>
  <div>Aguardando autenticar a conexão...</div>
</template>
