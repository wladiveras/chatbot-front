<script setup lang="ts">
import {
  DashboardModalCreateConnection,
  DashboardModalFetchConnection,
  DashboardModalDeleteConnection,
} from "#components"
import type { IConnection } from "~/types"
const connectionStore = useConnectionsStore()
const { getConnections, totalConnections } = storeToRefs(connectionStore)

const runtimeConfig = useRuntimeConfig()
const modal = useModal()

const title = ref(`${runtimeConfig.public.appName} - Minhas conexões`)
const description = computed(() => `${totalConnections.value} conexões realizadas`)

const openCreateConnection = () => {
  modal.open(DashboardModalCreateConnection, {
    async onSuccess() {
      await connectionStore.fetchConnections()
    },
  })
}

const openDeleteConnection = (connection_id: number) => {
  modal.open(DashboardModalDeleteConnection, {
    connection_id: connection_id,
    async onDelete() {
      await connectionStore.fetchConnections()
    },
  })
}

const navigateOrOpenModal = (path: string, connection: IConnection) => {
  if (!connection.is_active) {
    modal.open(DashboardModalFetchConnection, {
      connection_id: connection.id,
      async onSuccess() {
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

definePageMeta({
  layout: "dashboard",
})

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <CustomHeader title="Minhas conexões" :description="description">
    <template #actions>
      <UButton class="px-8 py-3" label="Nova conexão" @click="openCreateConnection" />
    </template>
  </CustomHeader>
  <!-- Connections -->
  <section class="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <UCard
      v-for="(item, index) in getConnections"
      :key="index"
      :ui="{
        base: 'border-[#E5E5E5]',
        background: 'bg-transparent',
        body: {
          base: 'h-full',
          background: '',
          padding: 'flex flex-col gap-6',
        },
      }"
      class="cursor-pointer"
    >
      <section class="h-full w-full flex justify-between gap-5">
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
