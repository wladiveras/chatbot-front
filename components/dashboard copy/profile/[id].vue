<script setup lang="ts">
import type { _background } from '#tailwind-config/theme/accentColor';

// Components
const ProfileSettings = resolveComponent('ProfileSettings');
const ProfileMessage = resolveComponent('ProfileMessage');
const ProfilePersonal = resolveComponent('ProfilePersonal');

const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);

const informations = computed(() => [
  {
    icon: "material-symbols:language",
    label: "Site",
    content: profile.value.site
  },
  {
    icon: "material-symbols:mail-outline",
    label: "E-mail",
    content: profile.value.email
  },
  {
    icon: "material-symbols:phone-iphone",
    label: "Whatsapp",
    content: profile.value.cellphone
  },
  {
    icon: "material-symbols:calendar-today-outline",
    label: "Conectado em",
    content: profile.value.connected_in
  },
]);

const tabs = [{
  key: 'settings',
  label: 'Configurações',
  icon: 'material-symbols:settings-outline',
  component: ProfileSettings
}, 
{
  key: 'message',
  label: 'Mensagem',
  icon: 'material-symbols:chat-outline-rounded',
  component: ProfileMessage
}, 
{
  key: 'profile',
  label: 'Perfil',
  icon: 'material-symbols:account-circle-outline',
  component: ProfilePersonal
}];

await profileStore.fetchProfile();

definePageMeta({
  layout: "dashboard"
});

useHead({
  title: `Perfil | ${profile.value.name}`
});
</script>

<template>
  <ULandingSection
    :ui="{
      wrapper: 'py-10 sm:py-10'
    }"
  >
    <main class="grid grid-cols-2 gap-y-5 gap-x-10 w-full gap-10">
      <header class="relative col-span-2 flex items-center justify-start gap-10">
        <UButton
          class="bg-gray-200 text-gray-500 absolute left-[-50px]"
          icon="material-symbols:arrow-back-rounded"
          size="lg"
          @click.prevent="navigateTo('/dashboard')"
        />
        <h1 class="text-blue-950 font-bold text-2xl">{{ profile.name }}</h1>
      </header>
      <!-- Profile -->
      <UCard :ui="{
        base: 'px-0 py-0 sm:p-0',
        body: {
          base: 'flex flex-col items-center',
          padding: 'p-2 pb-5 sm:p-2 sm:pb-10',
        },
      }">
        <section class="relative bg-blue-950 w-full h-[120px] rounded-lg mb-16">
          <UAvatar
            img-class="object-cover"
            class="absolute top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            :src="profile.url"
            alt="Avatar"
            size="3xl"
            :ui="{
              wrapper: 'border-2 border-white'
            }"
          />
        </section>
        <p class="font-normal text-xs text-gray-500">{{ profile.cellphone }}</p>
        <h2 class="text-blue-950 text-lg font-semibold">{{ profile.name }}</h2>
        <p class="text-gray-500 text-sm mt-3">{{ profile.description }}</p>
        <section class="flex items-center gap-4 mb-3">
          <UBadge
            class="gap-3 mt-5 text-sm font-semibold px-4 py-2 bg-[#46C78B1A] text-[#46C78B]"
            :ui="{ rounded: 'rounded-full' }"
          >
            <UIcon name="material-symbols:sync" />
            Atualizar
          </UBadge>
          <UBadge
            class="gap-3 mt-5 text-sm font-semibold px-4 py-2"
            :ui="{ rounded: 'rounded-full' }"
            :class="{
              'bg-[#46C78B1A] text-[#46C78B]': profile.status === 'Disconnected',
              'bg-[#CD0E300D] text-[#CD0E30]': profile.status === 'Connected'
            }"
          >
            <UIcon
              :name="profile.status === 'Connected'
              ? 'material-symbols:wifi-off'
              : 'material-symbols:wifi'"
            />
            {{ profile.status === "Connected" ? "Desconectar" : "Conectar" }}
          </UBadge>
        </section>
        <p class="font-normal text-gray-500 text-sm">
          <span class="text-[#46C78B]">
            {{ profile.status === "Connected" ? "Conectado" : "Desconectado" }}
          </span> 
          | Desde Junho de 2024
        </p>
      </UCard>
      <!-- Actions -->
      <UCard 
        class="p-5 row-span-2"
        :ui="{
          body: 'flex flex-col'
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
                rounded: 'rounded-full'
              }
            }
          }"
        >
          <template #default="{ item, index, selected }">
            <div class="flex items-center gap-2 relative truncate">
              <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

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
            base: 'flex flex-col gap-5'
          }
        }"
      >
        <h2 class="text-base font-semibold text-blue-950">Informações do usuário</h2>
        <section 
          v-for="(item, index) in informations" 
          :key="index"
          class="flex justify-between items-center text-gray-400"
        >
          <section class="flex items-center gap-4">
            <UIcon :name="item.icon" class="size-7 font-light" />
            <p class="text-sm">{{ item.label }}</p>
          </section>
          <p class="text-gray-600 font-normal text-sm">{{ item.content }}</p>
        </section>
      </UCard>
    </main>
  </ULandingSection>
</template>
