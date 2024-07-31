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
  <Handle :id="`init-source-${node.id}`" type="source" :position="Position.Right" />
  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-[#2DAD72] text-sm font-semibold">
      <UIcon name="material-symbols:flash-on-outline"/>
      <p>Bloco Inicial</p>
    </section>
    <p class="text-gray-500 font-normal text-sm">O Fluxo começa neste bloco. Conecte-o com outro bloco de conteúdo</p>
  </section>
</template>