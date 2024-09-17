<script lang="ts" setup></script>

<template>
  <main class="flex flex-col w-full h-screen box-border">
    <RealtimeEvents />
    <DashboardModalCheckDetails />
    <FlowsHeader />
    <main class="flex flex-1 overflow-hidden">
      <DashboardSidebar />
      <main class="flex-1 overflow-auto flex flex-col relative">
        <NuxtPage />
      </main>
    </main>
  </main>
</template>
