<script setup>
const flowsStore = useFlowsStore();
const { getFlows, totalFlows } = storeToRefs(flowsStore);

const description = computed(() => {
  return `${totalFlows.value} conexões realizadas`;
});

await flowsStore.fetchFlows();

definePageMeta({
  layout: "dashboard"
});

useHead({
  title: "Fluxos de conversa"
});
</script>

<template>
  <CustomHeader title="Fluxos de conversa" :description="description">
    <template #actions>
      <section class="flex gap-5">
        <UButton class="px-8 py-3" label="Importar fluxo" variant="outline" />
        <UButton class="px-8 py-3" label="Criar fluxo" @click="navigateTo('/flows/new')" />
      </section>
    </template>
  </CustomHeader>
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <UCard 
      class="cursor-pointer"
      v-for="(item, index) in getFlows" 
      :key="index" 
      :ui="{
        body: {
          base: 'flex flex-col gap-6'
        }
      }"
      @click="navigateTo(`/flows/${item.id}`)"
    >
      <CustomHeader
        :title="item.name"
        :description="item.description"
        title-class="font-semibold text-base text-blue-950"
        description-class="font-normal text-sm text-gray-500"
      >
        <template #actions>
          <UButton
            class="bg-[#CD0E300D] text-[#CD0E30]"
            icon="material-symbols:delete-outline"
            size="lg"
            @click.prevent
          />
        </template>
      </CustomHeader>
      <section class="gap-3 w-full flex items-center justify-between">
        <UBadge
          class="gap-3 text-sm font-semibold px-4 py-2"
          :ui="{ rounded: 'rounded-full' }"
          :class="{
            'bg-[#46C78B1A] text-[#46C78B]': item.isActive,
            'bg-[#CD0E300D] text-[#CD0E30]': !item.isActive
          }"
        >
          <UIcon
            :name="item.isActive
            ? 'material-symbols:flash-on'
            : 'material-symbols:flash-off'"
          />
          {{ item.isActive ? "Ativo" : "Inativo" }}
        </UBadge>
        <p class="text-gray-500 text-xs font-normal">Modificado em 17/07/24 às 12:24</p>
      </section>
    </UCard>
  </section>
</template>