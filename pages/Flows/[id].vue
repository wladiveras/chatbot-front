<script setup lang="ts">
const route = useRoute()
const sidebarStore = useSidebarStore()
const flowsStore = useFlowsStore()
const { isExpanded } = storeToRefs(sidebarStore)
const { flow, edge, node } = storeToRefs(flowsStore)
await flowsStore.fetchFlow(route.params?.id)

function addNewStep() {
  sidebarStore.toggleSize()
}

onUnmounted(() => {
  console.log(isExpanded.value)
  if (!isExpanded.value) {
    addNewStep()
  }
})

definePageMeta({
  layout: "flows",
})

// Pixijs
</script>

<template>
  <main class="flex gap-5 w-full h-full">
    <aside v-if="!isExpanded" class="w-full max-w-72 h-full border-r border-[#E5E5E5]">
      <header
        class="border-b border-[#E5E5E5] p-5 flex items-center justify-between text-gray-500 font-semibold text-base"
      >
        <section class="flex items-center gap-4">
          <UIcon name="material-symbols:inventory-2-outline" class="size-5" />
          <p>Conteúdo</p>
        </section>
        <UIcon
          class="size-6 cursor-pointer"
          name="material-symbols:close"
          @click="sidebarStore.toggleSize()"
        />
      </header>
      <FlowsOptions />
    </aside>
    <section class="relative w-full h-full p-5">
      <UButton
        class="absolute right-5 z-50"
        icon="material-symbols:add"
        size="xl"
        @click="addNewStep"
      />
      <ClientOnly>
        <div class="container">
          <FlowsEditor />
        </div>
      </ClientOnly>
    </section>
  </main>
</template>
