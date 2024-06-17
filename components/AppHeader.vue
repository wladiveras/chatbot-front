<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast.add({
      title: "Atenção!",
      description: error.message,
      icon: "material-symbols:error-outline",
    })
  } else {
    toast.add({
      title: "Atenção!",
      description: "Desconectado da sua cessão com sucesso.",
      icon: "i-heroicons-check-badge",
    })
  }
}
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
  <UHeader class="py-5 border-0 bg-gray-50/0">
    <template #logo>
      <NuxtImg src="/Logo.png" class="h-[30px] w-full" />
    </template>

    <template #right>
      <ULink
        class="hidden lg:flex mx-5 text-sm font-base primary-color"
        v-for="link in links"
        :key="link.label"
        :to="link.to"
        :active="link.active"
        active-class="text-pink-500"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 "
      >
        {{ link.label }}
      </ULink>

      <ULink
        v-if="!user"
        class="hidden lg:flex mx-5 text-sm font-base primary-color"
        to="/login"
        active-class="text-pink-500"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 "
      >
        Login
      </ULink>

      <ULink
        v-else
        @click="signOut"
        class="hidden lg:flex mx-5 text-sm font-base primary-color"
        active-class="text-pink-500"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 "
      >
        Sair
      </ULink>

      <UButton
        label="Teste grátis por 30 dias"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        class="hidden lg:flex lg:ml-10 py-[12px] px-[20px] gap-[7px] font-semibold primary-bg animate__animated animate__rubberBand"
      />
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />
      <UButton label="Teste 30 dias gratis" block />
    </template>
  </UHeader>
</template>
