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
const flowStore = useFlowsStore()

onMounted(async () => {})

async function onDelete() {
  loading.value = true

  await flowStore
    .removeFlow(props.flow_id)
    .then(() => {
      emit("delete")
      modal.close()
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <UDashboardModal
    :title="`Deletar automação`"
    :description="`Tem certeza que deseja deletar o automação?`"
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
