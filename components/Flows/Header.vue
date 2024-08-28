<script setup lang="ts">
import { DashboardSlideoverSettings, DashboardSlideoverPreview } from "#components"

const runtimeConfig = useRuntimeConfig()
const slideover = useSlideover()
const flowsStore = useFlowsStore()
const { flow, flowName, flowDescription, isCreation, isLoading } = storeToRefs(flowsStore)

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

function openSettings() {
  slideover.open(DashboardSlideoverSettings, {
    onClose: slideover.close,
  })
}

function openPreview() {
  slideover.open(DashboardSlideoverPreview, {
    onClose: slideover.close,
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
          <UTooltip text="Reinicia as sessões do fluxo">
            <UButton
              icon="line-md:backup-restore"
              :disabled="restartLoading"
              class="bg-gray-100 text-blue-950"
              @click="restartIsOpen = true"
            />
          </UTooltip>
          <!-- <UTooltip text="Pre-visualizar automação">
            <UButton
              icon="line-md:chat-round-dots"
              class="bg-gray-100 text-blue-950"
              @click="openPreview"
            />
          </UTooltip> -->
          <UTooltip text="Configurações Gerais">
            <UButton
              icon="line-md:cog"
              class="bg-gray-100 text-blue-950"
              @click="openSettings"
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

    <UModal v-model="isOpen" :transition="false"> </UModal>
  </header>
</template>
