<script setup>
import {
  DashboardModalCreateConnection,
  DashboardModalFetchConnection,
  DashboardModalDeleteConnection,
} from "#components"
const connectionStore = useConnectionsStore()
const { getConnections, totalConnections } = storeToRefs(connectionStore)

const modal = useModal()

function openCreateConnection() {
  modal.open(DashboardModalCreateConnection, {
    async onSuccess() {
      console.log("success")
      await connectionStore.fetchConnections()
    },
    async onClose() {
      console.log("close")
      await connectionStore.fetchConnections()
    },
  })
}

function openDeleteConnection(connection_id) {
  modal.open(DashboardModalDeleteConnection, {
    connection_id: connection_id,
    async onDelete() {
      await connectionStore.fetchConnections()
    },
  })
}

function navigateOrOpenModal(path, connection) {
  if (!connection.is_active) {
    modal.open(DashboardModalFetchConnection, {
      connection_id: connection.id,
      async success() {
        await connectionStore.fetchConnections()
      },
    })
  } else {
    navigateTo(path)
  }
}

onMounted(() => {
  connectionStore.fetchConnections()
})

const description = computed(() => {
  return `${totalConnections.value} conexões realizadas`
})

definePageMeta({
  layout: "dashboard",
})

useHead({
  title: "Minhas conexões",
})
</script>

<template>
  <CustomHeader title="Minhas conexões" :description="description">
    <template #actions>
      <UButton class="px-8 py-3" label="Nova conexão" @click="openCreateConnection" />
    </template>
  </CustomHeader>
  <!-- Connections -->
  <section class="grid grid-cols-1 xl:grid-cols-2 gap-5">
    <UCard
      v-for="(item, index) in getConnections"
      :key="index"
      :ui="{
        base: '',
      }"
      class="cursor-pointer"
    >
      <section class="w-full flex justify-between gap-5">
        <!-- Logo do usuário -->
        <section
          class="flex flex-col items-center gap-3"
          @click="navigateOrOpenModal(`/connections/${item.id}`, item)"
        >
          <UAvatar :src="item.connection_profile?.picture" :alt="item.name" size="xl" />
          <span
            class="w-[2px] h-full rounded-full"
            :class="{
              'bg-gradient-to-b from-[#46C78B] to-white': item.is_active,
              'bg-gradient-to-b from-[#CD0E30] to-white': !item.is_active,
            }"
          />
        </section>
        <section
          class="flex flex-col w-full"
          @click="navigateOrOpenModal(`/connections/${item.id}`, item)"
        >
          <p class="text-lg font-semibold text-blue-950">{{ item.name }}</p>
          <p class="text-sm font-normal text-gray-500">{{ item.description }}</p>
          <section>
            <UBadge
              class="gap-3 mt-5 text-sm font-semibold px-4 py-2"
              :ui="{ rounded: 'rounded-full' }"
              :class="{
                'bg-[#46C78B1A] text-[#46C78B]': item.is_active,
                'bg-[#CD0E300D] text-[#CD0E30]': !item.is_active,
              }"
            >
              <UIcon
                :name="
                  item.is_active ? 'material-symbols:wifi' : 'material-symbols:wifi-off'
                "
              />
              {{ item.is_active ? "Conectado" : "Desconectado" }}
            </UBadge>
          </section>
        </section>
        <section>
          <UButton
            class="bg-[#CD0E300D] text-[#CD0E30]"
            icon="material-symbols:delete-outline"
            size="lg"
            @click.prevent="openDeleteConnection(item.id)"
          />
        </section>
      </section>
    </UCard>
  </section>
</template>
