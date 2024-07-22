<script setup>
const route = useRoute();
const id = route.params.id;
const isNewFlow = id === 'new';

definePageMeta({
  layout: "dashboard"
});

useHead({
  title: isNewFlow ? "Novo fluxo" : "Atualizar fluxo"
});
</script>

<template>
  <div>
    <p v-if="isNewFlow">Creating a new flow</p>
    <p v-else>Editing flow with ID: {{ id }}</p>
  </div>
</template>