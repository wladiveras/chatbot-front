<script setup>
const flowStore = useFlowsStore()
const connectionStore = useConnectionsStore()
const { getFlows, flowById } = storeToRefs(flowStore)

await flowStore.fetchFlows()

let flows = Array.isArray(getFlows.value) ? getFlows.value : Object.values(getFlows.value)

flows = flows.map((item) => ({
  id: item.id,
  label: item.name,
}))

const items = [
  {
    slot: "select_flow",
    label: "Vincular fluxo a conexão",
    icon: "material-symbols:favorite-outline",
    defaultOpen: true,
  },
  {
    slot: "privacy",
    label: "Privacidade",
    icon: "material-symbols:lock-outline",
  },
]

const onSelectFlow = (option) => {
  const id = ref(option?.id)
  if (id) {
    connectionStore.selectFlow(id.value)
  }
}
</script>

<template>
  <section class="text-blue-950">
    <UAccordion
      :items="items"
      :ui="{
        wrapper: 'w-full flex flex-col',
        item: {
          base: 'text-blue-950',
          size: 'text-sm',
          color: 'text-gray-500 dark:text-gray-400',
          padding: 'px-3',
          icon: 'ms-auto transform transition-transform duration-200',
        },
      }"
    >
      <template #select_flow>
        <section class="flex flex-col gap-4">
          <UCommandPalette
            icon="carbon:flow-modeler"
            :loading="getFlows.loading"
            v-model="getFlowId"
            @update:model-value="onSelectFlow"
            placeholder="Pesquisar fluxos..."
            nullable
            :fuse="{
              resultLimit: 3,
            }"
            :groups="[{ key: 'flows', commands: flows }]"
            :close-button="{
              icon: 'i-heroicons-x-mark-20-solid',
              color: 'gray',
              variant: 'link',
              padded: false,
            }"
          >
            <template #empty-state>
              <div class="flex flex-col items-center justify-center py-6 gap-3">
                <UIcon name="carbon:flow-modeler" size="30px" />
                <span class="text-md"> Não foi possivel encontrar nenhum fluxo. </span>
                <UButton
                  label="Criar um novo fluxo"
                  @click="navigateTo('/flows/new')"
                  variant="soft"
                  class="mt-5"
                />
              </div>
            </template>
          </UCommandPalette>
        </section>
      </template>
      <template #privacy> em breve </template>
    </UAccordion>
  </section>
</template>
