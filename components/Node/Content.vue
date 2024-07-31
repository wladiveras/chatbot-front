<script setup>
import { Handle, Position } from '@vue-flow/core'

defineProps({
  node: {
    type: Object,
    required: true,
    default: () => {}
  }
})
</script>

<template>
  <Handle :id="`content-source-${node.id}`" type="target" :position="Position.Left" />
  <Handle :id="`content-source-${node.id}`" type="source" :position="Position.Right" />

  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <UIcon name="material-symbols:inventory-2-outline"/>
      <p>Conteúdo</p>
    </section>
    <p class="text-gray-500 font-normal text-sm">O Fluxo começa neste bloco. Conecte-o com outro bloco de conteúdo</p>
  </section>
</template>