<script lang="ts" setup>
import { useModalStore } from "@/stores/modal"

const user = {}
const ModalStore = useModalStore()

const connectionStore = useConnectionsStore()
const { getConnections, totalConnections } = storeToRefs(connectionStore)

await connectionStore.fetchConnections()

useHead({
  title: "Minhas conexões",
})

definePageMeta({
  layout: "dashboard",
})
</script>

<template>
  <div>
    <ULandingSection
      :ui="{
        wrapper: 'py-5 sm:py-5',
      }"
    >
      <!-- My Conections Header -->
      <section class="md:text-left relative flex flex-wrap items-center justify-between">
        <div>
          <h1 class="text-[32px] font-bold text-blue-950 flex flex-wrap lg:justify-left">
            Minhas conexões
          </h1>
          <p class="text-[16px] text-gray-500 border-gray-10 mt-1 font-light text-left">
            Você tem <span class="font-semibold">{{ totalConnections }}</span> conexões
            ativas
          </p>
        </div>
        <UButton
          @click="ModalStore.toggle"
          label="Nova conexão"
          icon="ic:baseline-whatsapp"
          class="py-[12px] px-[20px] font-normal bg-blue-950"
        />
      </section>
      <!-- My Conections Cards -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <UCard
          v-for="(item, index) in getConnections"
          :key="index"
          :ui="{
            base: '',
          }"
          class="cursor-pointer"
          @click="navigateTo(`/dashboard/profile/${item.id}`)"
        >
          <section class="w-full flex justify-between gap-5">
            <!-- Logo do usuário -->
            <section class="flex flex-col items-center gap-3">
              <UAvatar :src="item.url" alt="Avatar" size="xl" />
              <span
                class="w-[2px] h-full rounded-full"
                :class="{
                  'bg-gradient-to-b from-[#46C78B] to-white': item.status === 'Connected',
                  'bg-gradient-to-b from-[#CD0E30] to-white':
                    item.status === 'Disconnected',
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
                    'bg-[#CD0E300D] text-[#CD0E30]': item.status === 'Disconnected',
                  }"
                >
                  <UIcon
                    :name="
                      item.status === 'Connected'
                        ? 'material-symbols:wifi'
                        : 'material-symbols:wifi-off'
                    "
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
    </ULandingSection>
    <DashboardModalQrCode />
  </div>
</template>
