<script setup lang="ts">
const authStore = useAuthStore()
const { userName, userAvatar } = storeToRefs(authStore)
</script>

<template>
  <header
    class="flex items-center justify-between h-full max-h-24 border-b border-solid border-[#E5E5E5] px-8 py-6"
  >
    <NuxtImg src="/Logo.png" class="w-32 cursor-pointer" @click="navigateTo('/flows')" />
    <slot>
      <section class="flex items-center gap-5">
        <UBadge
          class="gap-3 text-sm font-semibold px-4 py-2 bg-[#46C78B1A] text-[#46C78B]"
          :ui="{ rounded: 'rounded-full' }"
        >
          <UIcon class="text-2xl" name="material-symbols:person-outline" />
          leads ilimitados
        </UBadge>
        <UAvatar :alt="userName" size="lg" :src="userAvatar" />
      </section>
    </slot>
  </header>
</template>
