<script setup lang="ts">
const props = defineProps({
  connection_id: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(["delete"])

const loading = ref(false)
const modal = useModal()
const toast = useToast()
const connectionStore = useConnectionsStore()

const { getName } = storeToRefs(connectionStore)

onMounted(async () => {
  await connectionStore.fetchConnection(props.connection_id)
})

async function onDelete() {
  loading.value = true

  await connectionStore.disconnectConnection().finally(async () => {
    await connectionStore
      .deleteConnection()
      .then(() => {
        toast.add({
          icon: "i-heroicons-check-circle",
          title: `A conexão foi deletada com sucesso.`,
          color: "red",
        })

        emit("delete")
        modal.close()
      })
      .catch(() => {
        toast.add({
          icon: "i-heroicons-exclamation-circle",
          title: `Não foi possível deletar a conexão.`,
          color: "red",
        })
      })
      .finally(() => {
        loading.value = false
      })
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
