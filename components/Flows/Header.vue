<script setup lang="ts">
const flowsStore = useFlowsStore()
const { flow, flowName, flowDescription, isCreation, isLoading } = storeToRefs(flowsStore)
const runtimeConfig = useRuntimeConfig()

const isOpen = ref(false)
const restartIsOpen = ref(false)
const restartLoading = ref(false)

function onRestart() {
  restartLoading.value = true

  flowsStore.resetFlowSession().finally(() => {
    restartLoading.value = false
    restartIsOpen.value = false
  })
}

useHead({
  title: runtimeConfig.public.appName + " - Editor de fluxo",
})
</script>

<template>
  <header
    class="flex items-center justify-between h-full max-h-24 border-b border-solid border-[#E5E5E5] px-8 py-6 gap-10"
  >
    <section class="w-full max-w-56 border-r border-[#E5E5E5]">
      <NuxtImg
        src="/Logo.png"
        class="w-32 cursor-pointer"
        @click="navigateTo('/flows')"
      />
    </section>

    <CustomHeader
      :title="flowName"
      :description="flowDescription"
      title-class="font-bold text-base"
      description-class="font-normal text-xs"
      editable
    >
      <template #actions>
        <section class="flex items-center gap-5">
          <!-- <UTooltip text="Desativar fluxo.">
            <UButton
              :icon="isDisableLoading ? 'svg-spinners:ring-resize' : 'line-md:watch-off'"
              :disabled="isDisableLoading"
              class="bg-gray-100 text-blue-950"
              @click="() => flowsStore.handleFlowActive()"
            />
          </UTooltip> -->
          <UTooltip text="Reinicia as sessões do fluxo.">
            <UButton
              icon="line-md:backup-restore"
              :disabled="restartLoading"
              class="bg-gray-100 text-blue-950"
              @click="restartIsOpen = true"
            />
          </UTooltip>
          <UTooltip text="Configuções de Remarketing.">
            <UButton
              icon="nimbus:marketing"
              :disabled="restartLoading"
              class="bg-gray-100 text-blue-950"
              @click="restartIsOpen = true"
            />
          </UTooltip>
          <UTooltip text="Edite o titulo de a descrição do fluxo">
            <UButton
              :icon="isLoading ? 'svg-spinners:ring-resize' : 'line-md:pencil'"
              :disabled="isLoading"
              class="bg-gray-100 text-blue-950"
              @click="isOpen = true"
            />
          </UTooltip>

          <UButton
            icon="streamline:interface-content-fire-lit-flame-torch-trending"
            :loading="isLoading"
            :label="
              isCreation
                ? isLoading
                  ? 'Criando fluxo'
                  : 'Criar Fluxo'
                : isLoading
                ? 'Salvando fluxo'
                : 'Salvar fluxo'
            "
            @click="() => flowsStore.resolveAction()"
          />
        </section>
      </template>
    </CustomHeader>

    <UDashboardModal
      v-model="restartIsOpen"
      title="Reiniciar sessões"
      description="Tem certeza que deseja reiniciar as sessões do fluxo? ao fazer isso, todas as sessões ativas serão encerradas e o fluxo vai recomeçar."
      icon="i-heroicons-exclamation-circle"
      :ui="{
      icon: { base: 'text-red-500 dark:text-red-400' } as any,
      footer: { base: 'ml-16' } as any
    }"
    >
      <template #footer>
        <UButton
          color="red"
          label="Reiniciar"
          :loading="restartLoading"
          @click="onRestart"
        />
        <UButton color="white" label="Cancelar" @click="restartIsOpen = false" />
      </template>
    </UDashboardModal>

    <UModal v-model="isOpen" :transition="false">
      <UForm :state="flow" class="space-y-4 gap-5 p-10">
        <UFormGroup label="Nome do fluxo" name="flow" eager-validation>
          <UInput v-model="flow.name" />
        </UFormGroup>
        <UFormGroup label="Descrição do fluxo" name="description" eager-validation>
          <UInput v-model="flow.description" />
        </UFormGroup>

        <UButton
          class="bg-blue-950 text-white"
          @click="isOpen = false"
          label="Atualizar"
          block
        />
      </UForm>
    </UModal>
  </header>
</template>
