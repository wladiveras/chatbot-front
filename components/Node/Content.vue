<script setup>
import { Handle, Position } from "@vue-flow/core"

defineProps({
  id: {
    type: String,
    required: true,
    default: () => {},
  },
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<template>
  <Handle :id="`content-source-${id}`" type="target" :position="Position.Left" />
  <Handle :id="`content-source-${id}`" type="source" :position="Position.Right" />

  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <p class="text-lg">
        <UIcon
          name="material-symbols:inventory-2-outline"
          class="relative top-[0.2rem]"
        />
        Grupo {{ id }}
      </p>
    </section>
    <FlowsCommands :id="id" :data="data.commands" />
  </section>
</template>
