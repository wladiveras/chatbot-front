<script setup lang="ts">
// Define props
const props = defineProps({
  connection_id: {
    type: Number,
    default: 0,
  },
})

// Define emits
const emit = defineEmits(["delete"])

// State variables
const loading = ref(false)
const modal = useModal()

const connectionStore = useConnectionsStore()
const { getName } = storeToRefs(connectionStore)

// Fetch connection details on mount
onMounted(async () => {
  await connectionStore.fetchConnection(props.connection_id)
})

// Handle delete action
const onDelete = async () => {
  loading.value = true
  await connectionStore.disconnectConnection()
  await connectionStore
    .deleteConnection()
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
    :title="`Deletar ${getName}`"
    :description="`Tem certeza que deseja deletar a conexão ${getName}?`"
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
