<script setup lang="ts">
const props = defineProps({
  flow_id: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(["delete"])

const loading = ref(false)
const modal = useModal()
const toast = useToast()
const flowStore = useFlowsStore()

onMounted(async () => {})

async function onDelete() {
  loading.value = true

  await flowStore
    .removeFlow(props.flow_id)
    .then(() => {
      toast.add({
        icon: "i-heroicons-check-circle",
        title: `O fluxo foi deletado com sucesso.`,
        color: "green",
      })

      emit("delete")
      modal.close()
    })
    .catch(() => {
      toast.add({
        icon: "i-heroicons-x-circle",
        title: `Não foi possível deletar o fluxo.`,
        color: "red",
      })
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <UDashboardModal
    :title="`Deletar Fluxo`"
    :description="`Tem certeza que deseja deletar o fluxo?`"
    icon="i-heroicons-exclamation-circle"
    prevent-close
    :close-button="null"
    :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton color="red" label="Deletar" :loading="loading" @click="onDelete" />
      <UButton color="white" label="Cancelar" @click="modal.close()" />
    </template>
  </UDashboardModal>
</template>
