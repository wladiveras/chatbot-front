<script setup lang="ts">
const { activeHeadings } = useScrollspy()

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
  {
    label: "Login",
    to: "/login",
    icon: "i-heroicons-question-mark-circle",
    active: activeHeadings.value.includes("/login"),
  },
])
</script>

<template>
  <footer class="w-full">
    <NuxtImg src="/Logo.png" class="h-[30px] m-auto mt-[100px] mb-[20px]" />
    <div class="hidden md:flex flex-nowrap items-center text-center justify-center gap-2">
      <ULink
        class="flex mx-5 text-sm font-base text-gray-500 border-gray-10"
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :active="link.active"
      >
        {{ link.label }}
      </ULink>
    </div>
    <div
      class="flex flex-nowrap items-center text-center justify-center gap-5 my-[30px] mb-[80px]"
    >
      <UIcon name="uil:facebook" class="flex text-2xl text-gray-500 border-gray-10 cursor-pointer" />
      <UIcon name="uil:twitter" class="flex text-2xl text-gray-500 border-gray-10 cursor-pointer" />
      <UIcon name="uil:instagram" class="flex text-2xl text-gray-500 border-gray-10 cursor-pointer" />
    </div>
    <p
      class="text-gray-500 border-gray-10 text-sm text-center border-t text-gray-500 border-gray-10 w-full block py-16"
    >
      Copyright © {{ new Date().getFullYear() }}. Todos os direitos reservados.
    </p>
  </footer>
</template>
<style scoped></style>
