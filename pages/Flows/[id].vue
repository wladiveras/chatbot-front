<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core"
import { initialEdges, initialNodes } from "@/utils/initial-elements.js"

const route = useRoute()
const sidebarStore = useSidebarStore()
const flowsStore = useFlowsStore()
const { isExpanded } = storeToRefs(sidebarStore)
const { flow, edge, node } = storeToRefs(flowsStore)

await flowsStore.fetchFlow(route.params?.id)

const {
  onInit,
  onNodeDragStop,
  onConnect,
  addEdges,
  addNodes,
  onNodeClick,
  setCenter,
} = useVueFlow()
const nodes = ref(initialNodes)
const edges = ref(initialEdges)

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

onNodeDragStop(({ event, nodes, node }) => {
  console.log("Node Drag Stop", { event, nodes, node })
})

onConnect((connection) => {
  addEdges(connection)
})

onNodeClick(({ node }) => {
  if (node.type !== "init") {
    if (isExpanded.value) sidebarStore.toggleSize()
    flowsStore.setSelectedNode(node)
    setCenter(node.position.x, node.position.y, { duration: 200, zoom: 1 })
  }
})

function addNewStep() {
  sidebarStore.toggleSize()

  addNodes({
    id: "4",
    data: { label: "Node 4" },
    position: { x: 400, y: 300 },
    class: "custom-node init",
  })
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
        <VueFlow
          :nodes="nodes"
          :edges="edges"
          :default-viewport="{ zoom: 0.5 }"
          :min-zoom="0.5"
          :max-zoom="3"
          fit-view-on-init
        >
          <template #node-init="props">
            <NodeInit :node="props" />
          </template>

          <template #node-content="props">
            <NodeContent :node="props" />
          </template>
        </VueFlow>
      </ClientOnly>
    </section>
  </main>
</template>
