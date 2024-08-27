<script setup>
const flowStore = useFlowsStore()
const connectionStore = useConnectionsStore()
const { getFlows } = storeToRefs(flowStore)
const { getFlowId, loading } = storeToRefs(connectionStore)

await flowStore.fetchFlows()

let flows = Array.isArray(getFlows.value) ? getFlows.value : Object.values(getFlows.value)

flows = flows.map((item) => ({
  id: item.id,
  name: item.name,
}))

const items = [
  {
    slot: "select_flow",
    label: "Vincular fluxo a conexão",
    icon: "material-symbols:favorite-outline",
    defaultOpen: true,
    action: () => handleFlowSelected(),
  },
  {
    slot: "privacy",
    label: "Privacidade",
    icon: "material-symbols:lock-outline",
    action: () => console.log("Privacy"),
  },
]

const handleFlowSelected = async () => {
  await connectionStore.selectFlow(flowSelected.value)
}

const flowSelected = ref(getFlowId)
</script>

<template>
  <section class="text-blue-950">
    <UAccordion
      :items="items"
      :ui="{
        wrapper: 'w-full flex flex-col text-primary',
        item: {
          base: 'text-blue-950 bg-blue-750',
          size: 'text-sm',
          color: 'text-gray-500 dark:text-gray-400',
          padding: 'px-3',
          icon: 'ms-auto transform transition-transform duration-200',
        },
      }"
    >
      <template #default="{ item, open }">
        <UButton
          color="gray"
          variant="ghost"
          class=""
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <template #leading>
            <div class="w-10 h-10 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-6 h-6 text-blue-950" />
            </div>
          </template>

          <span class="truncate text-blue-950"> {{ item.label }}</span>

          <template #trailing>
            <div class="ms-auto transform transition-transform duration-200">
              <UButton
                class="bg-blue-950 px-5"
                v-if="open"
                @click.prevent="item.action"
                :loading="loading"
              >
                Salvar
              </UButton>
              <UIcon
                v-if="!open"
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </div>
          </template>
        </UButton>
      </template>

      <template #select_flow>
        <section class="flex flex-col gap-4">
          <UFormGroup
            label="Fluxo"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500',
              },
            }"
          >
            <USelectMenu
              v-model="flowSelected"
              :options="flows"
              value-attribute="id"
              option-attribute="name"
              searchable
              searchable-placeholder="Buscar fluxo..."
              placeholder="Selecione um fluxo..."
            />
          </UFormGroup>
        </section>
      </template>

      <template #privacy>
        <div class="flex items-center gap-2">
          <UIcon name="lock-closed" />

          <span>Privacidade</span>
        </div>
      </template>
    </UAccordion>
  </section>
</template>
