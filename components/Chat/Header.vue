<template>
  <div class="flex items-center justify-between px-4 h-14">
    <div class="flex items-center gap-x-4">
      <h2 class="text-xl md:text-2xl text-blue-950 font-bold">Chatbot</h2>
      <UTooltip text="Limpar chat" v-if="!clearDisabled">
        <UButton color="gray" icon="i-heroicons-trash" @click="$emit('clear')" />
      </UTooltip>
    </div>
    <div class="flex items-center gap-x-4">
      <ChatColorMode />
      <UButton
        icon="i-heroicons-cog-6-tooth"
        color="gray"
        variant="ghost"
        class="md:hidden"
        @click="$emit('showDrawer')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["clear", "showDrawer"])

defineProps({
  clearDisabled: {
    type: Boolean,
    default: true,
  },
})
</script>
