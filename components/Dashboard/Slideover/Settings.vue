<script lang="ts" setup>
const flowsStore = useFlowsStore()
const { flow, getFlows } = storeToRefs(flowsStore)

await flowsStore.fetchFlows()

let flows = Array.isArray(getFlows.value) ? getFlows.value : Object.values(getFlows.value)

flows = flows.map((item) => ({
  id: item.id,
  name: item.name,
}))

const items = [
  {
    slot: "name_and_description",
    label: "Nome e Descrição",
    icon: "material-symbols:favorite-outline",
    defaultOpen: true,
    action: () => console.log("Privacy"),
  },
  {
    slot: "remarketing_finished",
    label: "Remarketing de conclusão",
    icon: "nimbus:marketing",
    action: () => console.log("Privacy"),
  },
  {
    slot: "remarketing_recovery",
    label: "Remarketing de recuperação",
    icon: "nimbus:marketing",
    action: () => console.log("Privacy"),
  },
]

const remarketingIn = ref(1)
const flowSelected = ref(null)

const emit = defineEmits(["close"])

const handleClose = () => {
  emit("close")
}
</script>
<template>
  <USlideover prevent-close>
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Configurações
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="handleClose"
          />
        </div>
      </template>

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

          <template #name_and_description>
            <section class="flex flex-col gap-4">
              <UFormGroup
                label="Nome"
                :ui="{
                  label: {
                    base: 'text-xs font-semibold text-gray-500',
                  },
                }"
              >
                <UInput v-model="flow.name" />
              </UFormGroup>
              <UFormGroup
                label="Status"
                :ui="{
                  label: {
                    base: 'text-xs font-semibold text-gray-500',
                  },
                }"
              >
                <UInput v-model="flow.description" />
              </UFormGroup>
            </section>
          </template>

          <template #remarketing_recovery>
            <section class="flex flex-col gap-4">
              <UFormGroup
                label="Fluxo para remarketing"
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

              <UFormGroup
                label=""
                :ui="{
                  label: {
                    base: 'text-xs font-semibold text-gray-500',
                  },
                }"
              >
                <URange v-model="remarketingIn" :min="1" :max="100" />
                <small>
                  Enviar remarketing após {{ remarketingIn }} dias de inatividade do
                  cliente que não finalizou o fluxo.
                </small>
              </UFormGroup>
            </section>
          </template>
          <template #remarketing_finished>
            <section class="flex flex-col gap-4">
              <UFormGroup
                label="Fluxo para remarketing"
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

              <UFormGroup
                label=""
                :ui="{
                  label: {
                    base: 'text-xs font-semibold text-gray-500',
                  },
                }"
              >
                <URange v-model="remarketingIn" :min="1" :max="100" />
                <small>
                  Enviar remarketing {{ remarketingIn }} dias após a conclusão do fluxo
                  principal.
                </small>
              </UFormGroup>
            </section>
          </template>
        </UAccordion>
      </section>
    </UCard>
  </USlideover>
</template>

<style></style>
