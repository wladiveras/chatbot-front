<script lang="ts" setup>
const authStore = useAuthStore();

authStore.init();
</script>

<template>
  <main class="flex flex-col w-full h-screen box-border">
    <DashboardHeader />
    <main class="flex flex-1 overflow-hidden">
      <DashboardSidebar />
      <main class="flex-1 p-10 pb-5 overflow-auto flex flex-col relative gap-16">
          <NuxtPage />
      </main>
    </main>
  </main>
</template>
