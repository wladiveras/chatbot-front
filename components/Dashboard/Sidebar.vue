<script setup lang="ts">
import { DashboardModalCreateConnection } from "#components"
const connectionStore = useConnectionsStore()
const authStore = useAuthStore()

const modal = useModal()

function openCreateConnection() {
  modal.open(DashboardModalCreateConnection, {
    async onSuccess() {
      await connectionStore.fetchConnections()
    },
  })
}

async function logOut() {
  await authStore.signOut()
}

const links = [
  {
    label: "Fluxos de conversas",
    to: "/flows",
    icon: "line-md:fork-right",
  },
  {
    label: "Nova Conexão",
    icon: "line-md:plus",
    action: openCreateConnection,
  },
  {
    label: "Minhas Conexões",
    to: "/connections",
    icon: "material-symbols:wifi-rounded",
  },
  {
    label: "Sair",
    action: logOut,
    icon: "material-symbols:logout",
  },

  // {
  //   label: "Configurações",
  //   to: '/settings',
  //   icon: "material-symbols:settings-outline-rounded"
  // },
  // {
  //   label: "Planos",
  //   to: '/plans',
  //   icon: "material-symbols:currency-exchange-rounded"
  // }
]

const sidebarStore = useSidebarStore()
const { isExpanded } = storeToRefs(sidebarStore)
const route = useRoute()

const isActive = computed(() => {
  return (path: any) => route.path.includes(path)
})
</script>

<template>
  <aside
    class="flex flex-col gap-4 h-full px-4 py-8 border-r border-solid border-[#E5E5E5] max-w-64 ease-in-out transition-all"
    :class="[isExpanded ? 'w-full' : 'w-max']"
  >
    <UButton
      v-for="(link, index) in links"
      :key="index"
      variant="ghost"
      color="gray"
      class="flex gap-5 p-4 rounded-lg font-medium"
      :class="{
        'bg-gray-200 text-blue-950': isActive(link.to),
        'text-gray-500': !isActive(link.to),
      }"
      @click="link.action ? link.action() : navigateTo(link.to)"
    >
      <UIcon :name="link.icon" class="w-5 h-5 flex-shrink-0" />
      <span v-if="isExpanded">{{ link.label }}</span>
    </UButton>
  </aside>
</template>
