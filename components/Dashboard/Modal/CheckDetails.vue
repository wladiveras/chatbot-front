<script lang="ts" setup>
// Store and Refs
const authStore = useAuthStore()
const {
  isAuthenticated,
  isMissingDetails,
  userAvatar,
  isLoadingUpdateDetails,
} = storeToRefs(authStore)

// Runtime Config
const runtimeConfig = useRuntimeConfig()
const appName = runtimeConfig.public.appName
const isOpen = ref(false)
const name = ref("")

const handleUpdateDetails = async () => {
  authStore
    .updateDetails(name.value)
    .then(() => {
      isOpen.value = false
    })
    .catch(() => {
      isOpen.value = true
    })
}

if (isAuthenticated.value && isMissingDetails.value) {
  isOpen.value = true
}
</script>
<template>
  <UModal v-model="isOpen" v-if="isOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Bem-vindo(a) ao {{ appName }} 👋
          </h3>
        </div>
      </template>

      <section class="flex flex-wrap gap-5">
        <section class="w-full">
          <NuxtImg
            :src="`/assets/images/${userAvatar}`"
            class="rounded-full w-[300px] m-auto block"
          />
        </section>

        <section class="gap-5">
          <p class="mb-5 text-center">
            Olá, como vai? <br />
            Para começarmos, poderia nos informar o seu nome?
          </p>

          <UInput v-model="name" class="mb-5" placeholder="Digite seu nome..." />
          <UButton @click="handleUpdateDetails" :loading="isLoadingUpdateDetails" block>
            Continuar
          </UButton>
        </section>
      </section>
    </UCard>
  </UModal>
</template>
