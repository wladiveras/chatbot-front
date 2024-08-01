<script setup lang="ts">
const headerStore = useHeaderStore();
</script>

<template>
  <header class="flex items-center justify-between h-full max-h-24 border-b border-solid border-[#E5E5E5] px-8 py-6 gap-10">
    <section class="w-full max-w-56 border-r border-[#E5E5E5]">
      <NuxtImg src="/Logo.png" class="w-32" />
    </section>
    <CustomHeader
      title="Novo fluxo"
      title-class="font-bold text-base"
      description="Descrição do fluxo"
      description-class="font-normal text-xs"
    >
    <template #actions>
      <section class="flex items-center gap-5">
        <!-- <UButton
          icon="mdi:cellphone-iphone"
          label="Visualização"
          class="bg-gray-100 text-blue-950"
        /> -->
        <UButton
          icon="streamline:interface-content-fire-lit-flame-torch-trending"
          label="Salvar fluxo"
        />
      </section>
    </template>
    </CustomHeader>
  </header>
</template>
