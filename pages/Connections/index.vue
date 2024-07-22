<script setup>
const ModalStore = useModalStore()
const connectionStore = useConnectionsStore();
const { getConnections, totalConnections } = storeToRefs(connectionStore);
const description = computed(() => {
  return `${totalConnections.value} conexões realizadas`;
})

await connectionStore.fetchConnections();

definePageMeta({
  layout: "dashboard"
});

useHead({
  title: "Minhas conexões"
});
</script>

<template>
  <CustomHeader title="Minhas conexões" :description="description">
    <template #actions>
      <UButton class="px-8 py-3" label="Nova conexão" @click="ModalStore.toggle" />
    </template>
  </CustomHeader>
  <!-- Connections -->
  <section class="grid grid-cols-1 xl:grid-cols-2 gap-5">
    <UCard
      v-for="(item, index) in getConnections"
      :key="index"
      :ui="{
        base: ''
      }"
      class="cursor-pointer"
      @click="navigateTo(`/connections/${item.id}`)"
    >
      <section class="w-full flex justify-between gap-5">
        <!-- Logo do usuário -->
        <section class="flex flex-col items-center gap-3">
          <UAvatar
            :src="item.url"
            alt="Avatar"
            size="xl"
          />
          <span
            class="w-[2px] h-full rounded-full"
            :class="{
              'bg-gradient-to-b from-[#46C78B] to-white': item.status === 'Connected',
              'bg-gradient-to-b from-[#CD0E30] to-white': item.status === 'Disconnected'
            }"
          />
        </section>
        <section class="flex flex-col w-full">
          <p class="text-lg font-semibold text-blue-950">{{ item.name }}</p>
          <p class="text-sm font-normal text-gray-500">{{ item.description }}</p>
          <section>
            <UBadge
              class="gap-3 mt-5 text-sm font-semibold px-4 py-2"
              :ui="{ rounded: 'rounded-full' }"
              :class="{
                'bg-[#46C78B1A] text-[#46C78B]': item.status === 'Connected',
                'bg-[#CD0E300D] text-[#CD0E30]': item.status === 'Disconnected'
              }"
            >
              <UIcon
                :name="item.status === 'Connected'
                ? 'material-symbols:wifi'
                : 'material-symbols:wifi-off'"
              />
              {{ item.status === "Connected" ? "Conectado" : "Desconectado" }}
            </UBadge>
          </section>
        </section>
        <section>
          <UButton
            class="bg-[#CD0E300D] text-[#CD0E30]"
            icon="material-symbols:delete-outline"
            size="lg"
            @click.prevent
          />
        </section>
      </section>
    </UCard>
  </section>
  <DashboardModalQrCode />
</template>