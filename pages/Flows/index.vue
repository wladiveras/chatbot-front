<script setup lang="ts">
import { DashboardModalCreateAutomation, DashboardModalDeleteFlow } from "#components"

// Store and Refs
const flowsStore = useFlowsStore()
const { getFlows, totalFlows } = storeToRefs(flowsStore)

// Composables
const runtimeConfig = useRuntimeConfig()
const modal = useModal()

// Page Title and Description
const title = ref(`${runtimeConfig.public.appName} - Automações de conversas`)
const description = computed(() => `${totalFlows.value} conexões realizadas`)

// Methods
const openDeleteFlow = (flowId: number) => {
  modal.open(DashboardModalDeleteFlow, {
    flow_id: flowId,
    async onDelete() {
      try {
        await flowsStore.fetchFlows()
      } catch (error) {
        console.error("Failed to fetch flows:", error)
      }
    },
  })
}

const handleChoiceAutomation = () => {
  //modal.open(DashboardModalCreateAutomation)
  navigateTo("/flows/new")
}

const fetchFlows = async () => {
  try {
    await flowsStore.fetchFlows()
  } catch (error) {
    console.error("Failed to fetch flows:", error)
  }
}

const handleNavigationTo = (flowType: string | string[], flowId: number) => {
  flowType === "automation"
    ? navigateTo(`/flows/automation/${flowId}`)
    : navigateTo(`/flows/${flowId}`)
}

// Fetch Flows on Mount
onMounted(() => {
  fetchFlows()
})

// Page Meta
definePageMeta({
  layout: "dashboard",
})

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <CustomHeader title="Automações de conversa" :description="description">
    <template #actions>
      <section class="flex gap-5">
        <UTooltip text="Em breve">
          <UButton
            class="px-8 py-3 cursor-not-allowed"
            label="Importar automação"
            variant="outline"
          />
        </UTooltip>
        <UButton
          class="px-8 py-3"
          label="Criar automação"
          @click="handleChoiceAutomation"
        />
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
          base: 'flex flex-col gap-6',
        },
      }"
      @click="handleNavigationTo(item.type, item.id)"
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
            @click.stop="openDeleteFlow(item.id)"
          />
        </template>
      </CustomHeader>
      <section class="gap-3 w-full flex items-center justify-between">
        <div>
          <UBadge
            class="gap-1 text-sm font-semibold px-2 py-2 mr-2"
            :ui="{ rounded: 'rounded-full' }"
            :class="{
              'bg-[#46C78B1A] text-[#46C78B]': item.is_active,
              'bg-[#CD0E300D] text-[#CD0E30]': !item.is_active,
            }"
          >
            <UIcon
              :name="
                item.is_active
                  ? 'material-symbols:flash-on'
                  : 'material-symbols:flash-off'
              "
            />
            {{ item.is_active ? "Ativo" : "Inativo" }}
          </UBadge>
          <UBadge
            class="gap-1 text-sm font-semibold px-2 py-2"
            :ui="{ rounded: 'rounded-full' }"
            :class="{
              'bg-blue-100 text-blue-400': item.type === 'flow',
              'bg-[#09adce0d] text-[#42a3bb]': item.type === 'automation',
            }"
          >
            <UIcon
              :name="
                item.type === 'automation'
                  ? 'fluent:bot-sparkle-20-filled'
                  : 'carbon:flow-stream-reference'
              "
            />
            {{ item.type === "automation" ? "Inteligência Artificial" : "Fluxograma" }}
          </UBadge>
        </div>
        <p class="text-gray-500 text-xs font-normal">
          Modificado em {{ formatDate(item.updated_at) }}
        </p>
      </section>
    </UCard>
  </section>
</template>
