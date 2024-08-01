<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore();

await authStore.validateCode(route?.params?.code || "");

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div>Aguardando conexão...</div>
</template>
