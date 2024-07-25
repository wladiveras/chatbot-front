<script setup>
defineProps({
  title: String,
  description: String,
  titleClass: {
    type: String,
    default: "font-bold text-2xl text-blue-950"
  },
  descriptionClass: {
    type: String,
    default: "font-normal text-sm text-gray-500"
  },
  customClass: {
    type: String,
    default: ""
  },
})
</script>

<template>
  <header class="flex items-center justify-between w-full" :class="customClass">
    <section class="flex flex-col gap-2">
      <h1 v-if="!!title" :class="titleClass">{{ title }}</h1>
      <p v-if="!!description" :class="descriptionClass">{{ description }}</p>
    </section>
    <slot name="actions" />
  </header>
</template>