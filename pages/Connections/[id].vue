<script setup lang="ts">
import type { _background } from "#tailwind-config/theme/accentColor"

// Components
const ProfileSettings = resolveComponent("ProfileSettings")
const ProfileMessage = resolveComponent("ProfileMessage")
const ProfilePersonal = resolveComponent("ProfilePersonal")

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const title = ref(`${runtimeConfig.public.appName} - Minhas conexões`)

const id: any = route?.params?.id

const profileStore = useProfileStore()
const connectionStore = useConnectionsStore()

const { connection } = storeToRefs(connectionStore)
const { profile } = storeToRefs(profileStore)

const informations = computed(() => [
  {
    icon: "material-symbols:language",
    label: "Site",
    content: profile.value.website,
    disabled: !profile.value.website,
  },
  {
    icon: "material-symbols:mail-outline",
    label: "E-mail",
    content: profile.value.email,
    disabled: !profile.value.email,
  },
  {
    icon: "material-symbols:phone-iphone",
    label: "Whatsapp",
    content: connection.value.connection_key,
    disabled: !connection.value.connection_key,
  },
  {
    icon: "material-symbols:calendar-today-outline",
    label: "Criada em",
    content: formatDate(connection.value.created_at),
    disabled: !connection.value.created_at,
  },
])

const tabs = [
  {
    key: "settings",
    label: "Configurações",
    icon: "material-symbols:settings-outline",
    component: ProfileSettings,
  },
  {
    key: "message",
    label: "Mensagem",
    icon: "material-symbols:chat-outline-rounded",
    component: ProfileMessage,
  },
  {
    key: "profile",
    label: "Perfil",
    icon: "material-symbols:account-circle-outline",
    component: ProfilePersonal,
  },
]

await connectionStore.fetchConnection(parseInt(id)).then(async () => {
  await profileStore.fetchProfile()
})

definePageMeta({
  layout: "dashboard",
})

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <main class="grid grid-cols-2 gap-y-5 gap-x-10 w-full gap-10">
    <header class="relative col-span-2 flex items-center justify-start gap-10">
      <UButton
        class="bg-gray-200 text-gray-500"
        icon="material-symbols:arrow-back-rounded"
        size="lg"
        @click.prevent="navigateTo('/connections')"
      />
      <h1 class="text-blue-950 font-bold text-2xl">{{ connection.name }}</h1>
    </header>
    <!-- Profile -->
    <UCard
      :ui="{
        base: 'px-0 py-0 sm:p-0',
        body: {
          base: 'flex flex-col items-center',
          padding: 'p-2 pb-5 sm:p-2 sm:pb-10',
        },
      }"
    >
      <section class="relative bg-blue-950 w-full h-[120px] rounded-lg mb-16">
        <UAvatar
          img-class="object-cover"
          class="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          :src="profile.picture"
          alt="Avatar"
          size="3xl"
          :ui="{
            wrapper: 'border-2 border-white',
          }"
        />
      </section>
      <p class="font-normal text-xs text-gray-500">{{ connection.connection_key }}</p>
      <h2 class="text-blue-950 text-lg font-semibold">
        {{ profile.name || connection.name }}
      </h2>
      <p class="text-gray-500 text-sm mt-3">{{ profile.description }}</p>
      <section class="flex items-center gap-4 mb-3">
        <UBadge
          class="gap-3 mt-5 text-sm font-semibold px-4 py-2"
          :ui="{ rounded: 'rounded-full' }"
          :class="{
            'bg-[#46C78B1A] text-[#46C78B]': connection.is_active,
            'bg-[#CD0E300D] text-[#CD0E30]': !connection.is_active,
          }"
        >
          <UIcon
            :name="
              !connection.is_active
                ? 'material-symbols:wifi-off'
                : 'material-symbols:wifi'
            "
          />
          {{ !connection.is_active ? "Desconectar" : "Conectado" }}
        </UBadge>
      </section>
      <p class="font-normal text-gray-500 text-sm">
        <span class="text-[#46C78B]">
          {{ connection.is_active ? "Conectado" : "Desconectado" }}
        </span>
        | Desde {{ formatDate(connection.updated_at) }}
      </p>
    </UCard>
    <!-- Actions -->
    <UCard
      class="p-5 row-span-2"
      :ui="{
        body: 'flex flex-col',
      }"
    >
      <UTabs
        :items="tabs"
        :ui="{
          base: '',
          wrapper: '',
          container: '',
          list: {
            rounded: 'rounded-full',
            background: 'bg-white',
            height: 'h-10',
            base: 'border border-solid border-gray-100',
            shadow: '',
            marker: {
              base: 'text-gray-500',
              background: 'bg-gray-100',
              rounded: 'rounded-full',
            },
            tab: {
              rounded: 'rounded-full',
            },
          },
        }"
      >
        <template #default="{ item, index, selected }">
          <div class="flex items-center gap-2 relative truncate">
            <span class="truncate">{{ item.label }}</span>
          </div>
        </template>
        <template #item="{ item }">
          <component :is="item.component" />
        </template>
      </UTabs>
    </UCard>
    <!-- Informations -->
    <UCard
      class="p-[10px]"
      :ui="{
        body: {
          base: 'flex flex-col gap-5',
        },
      }"
    >
      <h2 class="text-base font-semibold text-blue-950">Informações do usuário</h2>
      <section v-for="(item, index) in informations" :key="index">
        <section
          v-if="!item.disabled"
          class="flex justify-between items-center text-gray-400"
        >
          <section class="flex items-center gap-4">
            <UIcon :name="item.icon" class="size-7 font-light" />
            <p class="text-sm">{{ item.label }}</p>
          </section>
          <p class="text-gray-600 font-normal text-sm">{{ item.content }}</p>
        </section>
      </section>
    </UCard>
  </main>
</template>
