<script setup>
import { VueFlow, useVueFlow, Handle, Position,  Panel } from '@vue-flow/core'
import { initialEdges, initialNodes } from '@/utils/initial-elements.js'

const sidebarStore = useSidebarStore();
const { isExpanded } = storeToRefs(sidebarStore);

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject, addNodes } = useVueFlow()

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((connection) => {
  addEdges(connection)
})

/**
 * To update a node or multiple nodes, you can
 * 1. Mutate the node objects *if* you're using `v-model`
 * 2. Use the `updateNode` method (from `useVueFlow`) to update the node(s)
 * 3. Create a new array of nodes and pass it to the `nodes` ref
 */
function updatePos() {
  nodes.value = nodes.value.map((node) => {
    return {
      ...node,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
    }
  })
}

/**
 * toObject transforms your current graph data to an easily persist-able object
 */
function logToObject() {
  console.log(toObject())
}

/**
 * Resets the current viewport transformation (zoom & pan)
 */
function resetTransform() {
  setViewport({ x: 0, y: 0, zoom: 1 })
}

function toggleDarkMode() {
  dark.value = !dark.value
}

function addNewStep() {
  sidebarStore.toggleSize();

  addNodes({
    id: '4',
    type: 'input',
    data: { label: 'Node 4' },
    position: { x: 400, y: 300 },
    class: 'custom-node init',
  })
}

onUnmounted(() => {
  console.log(isExpanded.value);
  if (!isExpanded.value) {
    addNewStep();
  }
});

definePageMeta({
  layout: "flows"
});
</script>

<template>
  <main class="flex gap-5 w-full h-full">
    <aside v-if="!isExpanded" class="w-full max-w-72 h-full border-r border-[#E5E5E5]">
      <header class="border-b border-[#E5E5E5] p-5 flex items-center justify-between text-gray-500 font-semibold text-base">
        <section class="flex items-center gap-4">
          <UIcon 
            name="material-symbols:inventory-2-outline"
            class="size-5"
          />
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
          :default-viewport="{ zoom: 2.0 }"
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