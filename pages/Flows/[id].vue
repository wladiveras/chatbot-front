<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap';
import { initialEdges, initialNodes } from '@/utils/initial-elements.js'

const sidebarStore = useSidebarStore();

const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject } = useVueFlow()

const nodes = ref(initialNodes)

const edges = ref(initialEdges)

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
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

function addNewComponent() {
  sidebarStore.toggleSize();
}

definePageMeta({
  layout: "dashboard"
});

onUnmounted(() => {
  addNewComponent();
})
</script>

<template>
  <main class="relative w-full h-full">
    <UButton 
      class="absolute top-0 right-0 z-50"
      icon="material-symbols:add"
      size="xl"
      @click="addNewComponent"
    />
    <ClientOnly>
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        class="basic-flow"
        :default-viewport="{ zoom: 0.5 }"
        :min-zoom="0.5"
        :max-zoom="4"
        fit-view-on-init
      >
        <MiniMap />
        <!-- <MiniMap />

        <Controls position="top-left">
          <ControlButton title="Reset Transform" @click="resetTransform">
            <UIcon name="material-symbols:add" />
          </ControlButton>

          <ControlButton title="Shuffle Node Positions" @click="updatePos">
            <UIcon name="material-symbols:add" />
          </ControlButton>

          <ControlButton title="Toggle Dark Mode" @click="toggleDarkMode">
            <UIcon v-if="dark" name="material-symbols:add" />
            <UIcon v-else name="material-symbols:add" />
          </ControlButton>

          <ControlButton title="Log `toObject`" @click="logToObject">
            <UIcon name="material-symbols:add" />
          </ControlButton>
        </Controls> -->
      </VueFlow>
    </ClientOnly>
  </main>
</template>