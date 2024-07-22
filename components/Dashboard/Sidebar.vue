<script setup lang="ts">
const links = [
  {
    label: "Fluxo de conversas",
    to: '/flows',
    icon: "ic:baseline-swap-vert"
  },
  {
    label: "Minhas Conexões",
    to: '/connections',
    icon: "material-symbols:wifi-rounded"
  },
  // {
  //   label: "Nova Conexão",
  //   to: '/new-connection',
  //   icon: "material-symbols:add-rounded"
  // },
  {
    label: "Configurações",
    to: '/settings',
    icon: "material-symbols:settings-outline-rounded"
  },
  {
    label: "Planos",
    to: '/plans',
    icon: "material-symbols:currency-exchange-rounded"
  }
];

const sidebarStore = useSidebarStore();
const { isExpanded } = storeToRefs(sidebarStore);
const route = useRoute();

const isActive = computed(() => {
  return (path) => route.path.includes(path);
})
</script>

<template>
  <aside class="flex flex-col gap-4 w-max h-full px-4 py-8 border-r border-solid border-[#E5E5E5] max-w-64">
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
      @click="navigateTo(link.to)"
    >
      <UIcon :name="link.icon" class="w-5 h-5 flex-shrink-0" />
      <span v-if="isExpanded">{{ link.label }}</span>
    </UButton>
  </aside>
</template>
