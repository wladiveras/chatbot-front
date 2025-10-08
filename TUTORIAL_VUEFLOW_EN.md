# VueFlow Tutorial - How It Works and How to Implement

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [What is VueFlow?](#what-is-vueflow)
3. [Installation](#installation)
4. [Core Concepts](#core-concepts)
5. [Basic Implementation](#basic-implementation)
6. [Custom Nodes](#custom-nodes)
7. [State Management](#state-management)
8. [Styling](#styling)
9. [Practical Examples](#practical-examples)
10. [Tips and Best Practices](#tips-and-best-practices)

---

## 🎯 Introduction

This tutorial explains how VueFlow is implemented in this chatbot project, demonstrating how to create visual and interactive automation flows for building automated conversations.

## 🔍 What is VueFlow?

VueFlow is a Vue 3 library for creating interactive and customizable flow editors (flowcharts). It's perfect for:

- Creating visual automations
- Drawing interactive flowcharts
- Building workflow editors
- Visualizing processes and pipelines

**Key features:**
- Compatible with Vue 3 and Composition API
- Support for custom nodes and edges
- Zoom, pan, and auto fit-view
- Fully reactive and performant
- TypeScript ready

## 📦 Installation

### 1. Install dependencies

```bash
pnpm add @vue-flow/core @vue-flow/minimap
```

### 2. Import CSS styles

In `assets/scss/main.scss`:

```scss
/* Required styles for VueFlow */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';

/* Default theme (optional) */
@import '@vue-flow/core/dist/theme-default.css';
```

### 3. Configure Nuxt

In `nuxt.config.ts`, make sure SSR is disabled:

```typescript
export default defineNuxtConfig({
  ssr: false, // VueFlow requires client-side rendering
  // ... other configurations
})
```

## 🧩 Core Concepts

### Nodes

**Nodes** are the blocks/elements of your flow. Each node has:

```typescript
{
  id: "1",              // Unique ID
  type: "init",         // Node type (for customization)
  position: { x: 0, y: 0 }, // Position on canvas
  data: {               // Custom data
    commands: []
  },
  class: "custom-node" // Custom CSS classes
}
```

### Edges (Connections)

**Edges** are the lines connecting nodes:

```typescript
{
  id: "e1-2",           // Unique connection ID
  source: "1",          // Source node ID
  target: "2",          // Target node ID
  animated: true,       // Line animation
  markerEnd: MarkerType.ArrowClosed // Arrow at the end
}
```

### Handles (Connection Points)

**Handles** are the points where edges can connect:

```vue
<Handle 
  type="source"        // source (output) or target (input)
  :position="Position.Right"  // Position: Top, Right, Bottom, Left
  :id="`source-${id}`" // Unique handle ID
/>
```

## 🚀 Basic Implementation

### 1. Create initial elements file

File: `utils/initial-elements.ts`

```typescript
import { MarkerType } from "@vue-flow/core";

export const initialNodes = [
  {
    id: "1",
    type: "init",
    position: { x: 0, y: 0 },
    data: {
      commands: [],
    },
    class: "custom-node init",
  },
  {
    id: "2",
    type: "content",
    position: { x: 500, y: 200 },
    data: {
      commands: [
        {
          label: "Text",
          description: "Send a text message to the client.",
          type: "text",
          action: "message",
          value: "Hello, how are you?",
          delay: 5,
          icon: "material-symbols:font-download-outline",
        },
      ],
    },
    class: "custom-node content",
  },
];

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerEnd: MarkerType.ArrowClosed,
  },
];
```

### 2. Create main page with VueFlow

File: `pages/Flows/[id].vue`

```vue
<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core"

// Import stores
const flowsStore = useFlowsStore()
const { nodes, edges, selectedNode } = storeToRefs(flowsStore)

// VueFlow composables
const {
  onInit,
  onConnect,
  addEdges,
  addNodes,
  onNodeClick,
  setCenter,
} = useVueFlow()

// Initialization: adjust the view
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

// Connect nodes when user drags
onConnect((connection) => {
  addEdges(connection)
})

// Action on node click
onNodeClick(({ node }) => {
  if (node.type !== "init") {
    flowsStore.setSelectedNode(node)
    setCenter(node.position.x, node.position.y, { 
      duration: 200, 
      zoom: 1 
    })
  }
})

// Add new node
const addNewStep = () => {
  const lastNode = nodes.value[nodes.value.length - 1]
  const id = Number(lastNode.id) + 1

  const position = {
    x: lastNode.position.x + 500,
    y: lastNode.position.y + 500,
  }

  const newNode = {
    id: String(id),
    type: "content",
    class: "custom-node content",
    position,
    data: {
      commands: [],
    },
  }

  addNodes([newNode])
  setCenter(position.x, position.y, { duration: 200, zoom: 1 })
}
</script>

<template>
  <main class="flex w-full h-full">
    <section class="relative w-full h-full">
      <!-- Button to add new node -->
      <UButton
        class="absolute right-5 top-5 z-50"
        icon="material-symbols:add"
        size="xl"
        @click="addNewStep"
      />
      
      <!-- VueFlow component -->
      <ClientOnly>
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :default-viewport="{ zoom: 0.5 }"
          :min-zoom="0.5"
          :max-zoom="3"
          fit-view-on-init
        >
          <!-- Template for custom "init" type node -->
          <template #node-init="props">
            <NodeInit :node="props" />
          </template>

          <!-- Template for custom "content" type node -->
          <template #node-content="{ data, id }">
            <NodeContent :id="id" :data="data" />
          </template>
        </VueFlow>
      </ClientOnly>
    </section>
  </main>
</template>
```

### 3. Main events explanation

#### `onInit(callback)`
Executed when VueFlow is initialized. Useful for setting up the initial view:

```javascript
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView() // Adjusts zoom to show all nodes
})
```

#### `onConnect(callback)`
Executed when user connects two nodes by dragging:

```javascript
onConnect((connection) => {
  addEdges(connection) // Adds the new connection
})
```

#### `onNodeClick(callback)`
Executed when a node is clicked:

```javascript
onNodeClick(({ node }) => {
  // Center the clicked node
  setCenter(node.position.x, node.position.y, { 
    duration: 200, // 200ms animation
    zoom: 1        // Zoom level
  })
})
```

## 🎨 Custom Nodes

### Initial Node (Init)

File: `components/Node/Init.vue`

```vue
<script setup>
import { Handle, Position } from "@vue-flow/core"

defineProps({
  node: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <!-- Output handle (right) -->
  <Handle 
    :id="`init-source-${node.id}`" 
    type="source" 
    :position="Position.Right" 
  />
  
  <!-- Node content -->
  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-[#2DAD72] text-sm font-semibold">
      <UIcon name="material-symbols:flash-on-outline" />
      <p>Initial Block</p>
    </section>
    <p class="text-gray-500 font-normal text-sm">
      The automation starts in this block. Connect it with another content block
    </p>
  </section>
</template>
```

### Content Node

File: `components/Node/Content.vue`

```vue
<script setup>
import { Handle, Position } from "@vue-flow/core"

defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <!-- Input handle (left) -->
  <Handle 
    :id="`content-target-${id}`" 
    type="target" 
    :position="Position.Left" 
  />
  
  <!-- Output handle (right) -->
  <Handle 
    :id="`content-source-${id}`" 
    type="source" 
    :position="Position.Right" 
  />

  <!-- Node content -->
  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <p class="text-lg">
        <UIcon name="material-symbols:inventory-2-outline" />
        Group {{ id }}
      </p>
    </section>
    
    <!-- Commands component -->
    <FlowsCommands :id="id" :data="data.commands" />
  </section>
</template>
```

### Handle Positions

```typescript
import { Position } from "@vue-flow/core"

// Available positions:
Position.Top     // Top
Position.Right   // Right
Position.Bottom  // Bottom
Position.Left    // Left
```

## 📊 State Management

### Pinia Store for Flows

File: `stores/flows.ts`

```typescript
import { defineStore } from "pinia"

export const useFlowsStore = defineStore("flows", {
  state: () => ({
    nodes: [],
    edges: [],
    selectedNode: {},
  }),
  
  getters: {
    getNodes: (state) => state.nodes || [],
    getEdges: (state) => state.edges || [],
    lastNode: (state) => state.nodes[state.nodes.length - 1] || null,
  },
  
  actions: {
    setSelectedNode(node) {
      this.selectedNode = node || {}
    },
    
    async fetchFlow(type, id) {
      // Load flow from server
      const response = await get(`/flow/${id}`)
      this.nodes = response.node || []
      this.edges = response.edge || []
    },
    
    async updateFlow() {
      // Save flow to server
      await put(`/flow/${this.flow.id}`, {
        node: this.nodes,
        edge: this.edges,
      })
    },
  },
})
```

### Using the Store in Components

```vue
<script setup>
import { useFlowsStore } from "~/stores/flows"

const flowsStore = useFlowsStore()
const { nodes, edges, selectedNode } = storeToRefs(flowsStore)

// Load data on mount
onMounted(async () => {
  await flowsStore.fetchFlow("flow", route.params.id)
})
</script>
```

## 🎨 Styling

### Custom Node Styles

File: `assets/scss/vue-flow.scss`

```scss
.custom-node {
  background: #ECEEF2;
  color: #64748B;
  border: none;
  border-radius: 10px;
  padding: 20px;
  outline: none;
  width: fit-content;

  &:hover {
    box-shadow: none;
  }

  // Initial node with light green background
  &.init {
    background: #2DAD721A;
  }

  // Content node with gray background
  &.content {
    background: #ECEEF2;
  }
}
```

### Viewport Configuration

```vue
<VueFlow
  v-model:nodes="nodes"
  v-model:edges="edges"
  :default-viewport="{ zoom: 0.5 }"  // Initial zoom
  :min-zoom="0.5"                     // Minimum zoom
  :max-zoom="3"                       // Maximum zoom
  fit-view-on-init                    // Adjust view on load
>
```

## 💡 Practical Examples

### Example 1: Add Node Programmatically

```javascript
const addNewStep = () => {
  const lastNode = nodes.value[nodes.value.length - 1]
  const newId = String(Number(lastNode.id) + 1)

  const newNode = {
    id: newId,
    type: "content",
    position: {
      x: lastNode.position.x + 500,
      y: lastNode.position.y + 500,
    },
    data: {
      commands: [],
    },
    class: "custom-node content",
  }

  addNodes([newNode])
  
  // Center on new node
  setCenter(newNode.position.x, newNode.position.y, { 
    duration: 200, 
    zoom: 1 
  })
}
```

### Example 2: Connect Nodes Automatically

```javascript
const connectNodes = (sourceId, targetId) => {
  const newEdge = {
    id: `e${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    animated: true,
    markerEnd: MarkerType.ArrowClosed,
  }
  
  addEdges([newEdge])
}
```

### Example 3: Update Node Data

```javascript
import { useVueFlow } from "@vue-flow/core"

const { updateNodeData } = useVueFlow()

const addCommand = (nodeId, command) => {
  const node = nodes.value.find(n => n.id === nodeId)
  const commands = [...node.data.commands, command]
  
  updateNodeData(nodeId, { commands })
}
```

### Example 4: Remove Node and its Connections

```javascript
import { useVueFlow } from "@vue-flow/core"

const { removeNodes, removeEdges } = useVueFlow()

const deleteNode = (nodeId) => {
  // Remove the node
  removeNodes([nodeId])
  
  // Remove edges connected to the node
  const connectedEdges = edges.value.filter(
    edge => edge.source === nodeId || edge.target === nodeId
  )
  removeEdges(connectedEdges.map(e => e.id))
}
```

## 🔧 Advanced Features

### Monitor Node Changes

```javascript
onNodesChange((changes) => {
  changes.forEach(change => {
    if (change.type === 'remove') {
      console.log('Node removed:', change.id)
    }
    if (change.type === 'position') {
      console.log('Node moved:', change.id, change.position)
    }
  })
})
```

### Monitor Edge Changes

```javascript
onEdgesChange((changes) => {
  changes.forEach(change => {
    if (change.type === 'remove') {
      console.log('Edge removed:', change.id)
    }
  })
})
```

### Validate Connections

```javascript
const isValidConnection = (connection) => {
  // Don't allow self-connection
  if (connection.source === connection.target) {
    return false
  }
  
  // Don't allow duplicate connections
  const exists = edges.value.some(
    edge => edge.source === connection.source && 
            edge.target === connection.target
  )
  
  return !exists
}

onConnect((connection) => {
  if (isValidConnection(connection)) {
    addEdges(connection)
  }
})
```

## 📱 Minimap (Optional)

To add a navigation minimap:

```vue
<script setup>
import { VueFlow } from "@vue-flow/core"
import { MiniMap } from "@vue-flow/minimap"
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <!-- Your node templates -->
    
    <!-- Minimap -->
    <MiniMap />
  </VueFlow>
</template>
```

## 📋 Tips and Best Practices

### 1. Use ClientOnly for SSR

```vue
<ClientOnly>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <!-- ... -->
  </VueFlow>
</ClientOnly>
```

### 2. Unique IDs

Always use unique IDs for nodes and edges:

```javascript
const newNodeId = `node-${Date.now()}`
const newEdgeId = `edge-${sourceId}-${targetId}`
```

### 3. Data Persistence

Save the state of nodes and edges regularly:

```javascript
watch([nodes, edges], () => {
  // Debounce to avoid too many requests
  debouncedSave()
}, { deep: true })
```

### 4. Performance

For large flows, consider:
- Node virtualization
- Lazy loading of data
- Limiting the number of visible nodes

### 5. Accessibility

```vue
<VueFlow
  :nodes="nodes"
  :edges="edges"
  :keyboard="true"  // Enable keyboard navigation
  :pan-on-drag="true"
  :zoom-on-scroll="true"
>
```

### 6. Data Validation

Validate data before creating nodes:

```javascript
const createNode = (data) => {
  if (!data.id || !data.position) {
    throw new Error('Invalid node: missing id or position')
  }
  
  addNodes([data])
}
```

## 🐛 Troubleshooting

### Problem: Nodes don't appear

**Solution:** Check if:
- Nodes have `position` defined
- VueFlow is inside a container with defined height
- ClientOnly is being used (for SSR)

### Problem: Connections don't work

**Solution:** Make sure that:
- Handles have unique IDs
- Handle types are correct (`source` and `target`)
- The `onConnect` event is implemented

### Problem: Styles not applying

**Solution:**
- Import VueFlow CSS correctly
- Check if custom classes are in SCSS
- Use `!important` if necessary to override default styles

## 📚 Additional Resources

- **Official Documentation:** [https://vueflow.dev](https://vueflow.dev)
- **Examples:** [https://vueflow.dev/examples](https://vueflow.dev/examples)
- **GitHub:** [https://github.com/bcakmakoglu/vue-flow](https://github.com/bcakmakoglu/vue-flow)

## 🎓 Conclusion

This tutorial covered:
- ✅ Installation and VueFlow configuration
- ✅ Core concepts (nodes, edges, handles)
- ✅ Custom node implementation
- ✅ State management with Pinia
- ✅ Styling and customization
- ✅ Practical examples and use cases
- ✅ Best practices and troubleshooting

With this knowledge, you're ready to create complex and interactive automation flows using VueFlow in your Vue 3 project!

---

**Last updated:** 2024
**VueFlow version:** 1.41.1
**Vue version:** 3.x
