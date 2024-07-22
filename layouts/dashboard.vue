<script lang="ts" setup></script>

<template>
  <main class="flex flex-col w-full h-screen box-border">
    <DashboardHeader />
    <main class="flex flex-1 overflow-hidden">
      <DashboardSidebar />
      <main class="flex-1 p-10 pb-5 overflow-auto">
        <ULandingSection
        :ui="{
          wrapper: '',
          container: 'gap-16 flex flex-col',
        }"
          >
            <NuxtPage />
        </ULandingSection>
      </main>
    </main>
  </main>
</template>
