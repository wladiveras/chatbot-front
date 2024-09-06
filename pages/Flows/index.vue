<script setup lang="ts">
import { DashboardModalDeleteFlow } from "#components"

const runtimeConfig = useRuntimeConfig()
const flowsStore = useFlowsStore()
const { getFlows, totalFlows } = storeToRefs(flowsStore)

const modal = useModal()
const isOpen = ref(false)

const description = computed(() => `${totalFlows.value} conexões realizadas`)

const openDeleteFlow = (flow_id: number) => {
  modal.open(DashboardModalDeleteFlow, {
    flow_id,
    async onDelete() {
      try {
        await flowsStore.fetchFlows()
      } catch (error) {
        console.error("Failed to fetch flows:", error)
      }
    },
  })
}

const fetchFlows = async () => {
  try {
    await flowsStore.fetchFlows()
  } catch (error) {
    console.error("Failed to fetch flows:", error)
  }
}

const handleNavigationTo = (flow_type: string | string[]) => {
  flow_type === "automation"
    ? navigateTo(`/flows/automation/${flow_type}`)
    : navigateTo(`/flows/${flow_type}`)
}

fetchFlows()

definePageMeta({
  layout: "dashboard",
})

useHead({
  title: `${runtimeConfig.public.appName} - automações de conversa`,
})
</script>

<template>
  <UModal v-model="isOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Qual tipo de Automação deseja criar?
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="isOpen = false"
          />
        </div>
      </template>

      <section class="flex content-center gap-5">
        <section class="flex-1">
          <UButton
            block
            label="Automação com IA"
            @click="navigateTo('/flows/automation/new')"
          />
          <small class="ml-2 mt-2 block">
            Crie uma automação de conversa com inteligência artificial para atender seus
            clientes.
          </small>
        </section>
        <section class="flex-1">
          <UButton block label="Automação com fluxos" @click="navigateTo('/flows/new')" />
          <small class="ml-2 mt-2 block">
            Crie um fluxo de conversa para automatizar o atendimento e a comunicação com
            seus clientes.
          </small>
        </section>
      </section>
    </UCard>
  </UModal>

  <CustomHeader title="automações de conversa" :description="description">
    <template #actions>
      <section class="flex gap-5">
        <UTooltip text="Em breve">
          <UButton
            class="px-8 py-3 cursor-not-allowed"
            label="Importar automação"
            variant="outline"
          />
        </UTooltip>
        <UButton class="px-8 py-3" label="Criar automação" @click="isOpen = true" />
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
      @click="handleNavigationTo(item.type)"
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
