<script setup>
import { Handle, Position } from "@vue-flow/core"

defineProps({
  node: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<template>
  <Handle :id="`content-source-${node.id}`" type="target" :position="Position.Left" />
  <Handle :id="`content-source-${node.id}`" type="source" :position="Position.Right" />

  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <p class="text-lg">
        <UIcon
          name="material-symbols:inventory-2-outline"
          class="relative top-[0.2rem]"
        />
        Grupo {{ node.id }}
      </p>
    </section>
    <FlowsCommands :node-id="Number(node.id)" />
  </section>
</template>
