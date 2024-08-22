<script setup lang="ts">
const nuxtApp = useNuxtApp()
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const { activeHeadings, updateHeadings } = useScrollspy()

const links = computed(() => [
  {
    label: "Recursos",
    to: "#features",
    icon: "i-heroicons-cube-transparent",
    active:
      activeHeadings.value.includes("features") &&
      !activeHeadings.value.includes("pricing"),
  },
  {
    label: "Preços",
    to: "#pricing",
    icon: "i-heroicons-credit-card",
    active:
      activeHeadings.value.includes("pricing") &&
      !activeHeadings.value.includes("testimonials"),
  },
  {
    label: "Depoimentos",
    to: "#testimonials",
    icon: "i-heroicons-academic-cap",
    active: activeHeadings.value.includes("testimonials"),
  },
])

nuxtApp.hooks.hookOnce("page:finish", () => {
  updateHeadings([
    document.querySelector("#features"),
    document.querySelector("#pricing"),
    document.querySelector("#testimonials"),
  ])
})
</script>

<template>
  <UHeader>
    <UHeader class="py-5 border-0 bg-gray-50/0">
    <template #logo>
      <NuxtImg src="/Logo.png" class="h-[30px] w-full" />
    </template>
    <template #right>
      <ULink
        class="hidden lg:flex mx-5 text-sm font-base text-blue-950"
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        :active="link.active"
        active-class="text-blue-950"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        {{ link.label }}
      </ULink>
      <UButton
        v-if="isAuthenticated"
        to="/flows"
        label="Painel de Controle"
        icon="line-md:gauge"
        class="hidden lg:flex lg:ml-10 py-[12px] px-[20px] gap-[7px] font-semibold animate__animated animate__rubberBand"
      />
      <UButton
        v-else
        to="/login"
        label="Teste grátis por 30 dias"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        class="hidden lg:flex lg:ml-10 py-[12px] px-[20px] gap-[7px] font-semibold animate__animated animate__rubberBand"
      />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />
      <UDivider class="my-6" />
      <UButton v-if="isAuthenticated" to="/flows" label="Painel de Controle" block />
      <UButton v-else to="/login" label="Teste 30 dias gratis" block />
    </template>
  </UHeader>
</template>
