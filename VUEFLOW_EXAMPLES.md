# Exemplos de Código VueFlow / VueFlow Code Examples

Este arquivo contém exemplos práticos de código extraídos da implementação do VueFlow neste projeto.

This file contains practical code examples extracted from the VueFlow implementation in this project.

---

## 📝 Exemplo Completo de Página / Complete Page Example

### Arquivo: `pages/Flows/[id].vue`

```vue
<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core"

const route = useRoute()
const sidebarStore = useSidebarStore()
const flowsStore = useFlowsStore()
const { isExpanded } = storeToRefs(sidebarStore)
const { nodes, edges, lastNode, selectedNode } = storeToRefs(flowsStore)

const {
  onInit,
  onConnect,
  addEdges,
  addNodes,
  onNodeClick,
  setCenter,
  onNodesChange,
} = useVueFlow()

onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
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

onNodesChange((param) => {
  if (param[0].type === "remove") {
    sidebarStore.toggleSize()
  }
})

const addNewStep = () => {
  const id = Number(lastNode.value.id) + 1

  const position = {
    x: lastNode.value.position.x + 500,
    y: lastNode.value.position.y + 500,
  }

  const newNode = {
    id,
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

const resetSidebar = () => {
  sidebarStore.toggleSize()
  flowsStore.setSelectedNode()
}

onMounted(async () => {
  await flowsStore.fetchFlow("flow", route.params?.id)
})

onUnmounted(() => {
  if (!isExpanded.value) {
    resetSidebar()
  }
})

definePageMeta({
  layout: "flows",
})
</script>

<template>
  <main class="flex w-full h-full">
    <aside
      v-if="!isExpanded"
      class="overflow-auto w-full max-w-72 h-full border-r border-[#E5E5E5]"
    >
      <header
        class="border-b border-[#E5E5E5] p-5 flex items-center justify-between text-gray-500 font-semibold text-base"
      >
        <section class="flex items-center gap-4">
          <UIcon name="material-symbols:inventory-2-outline" class="size-5" />
          <p>Grupo {{ selectedNode.id }}</p>
        </section>
        <UIcon
          class="size-6 cursor-pointer"
          name="material-symbols:close"
          @click="resetSidebar"
        />
      </header>
      <FlowsOptions />
    </aside>
    <section class="relative w-full h-full">
      <UButton
        class="absolute right-5 top-5 z-50"
        icon="material-symbols:add"
        size="xl"
        @click="addNewStep"
      />
      <ClientOnly>
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :default-viewport="{ zoom: 0.5 }"
          :min-zoom="0.5"
          :max-zoom="3"
          fit-view-on-init
        >
          <template #node-init="props">
            <NodeInit :node="props" />
          </template>

          <template #node-content="{ data, id }">
            <NodeContent :id="id" :data="data" />
          </template>
        </VueFlow>
      </ClientOnly>
    </section>
  </main>
</template>
```

---

## 🎨 Componentes de Node / Node Components

### Node Inicial / Initial Node

**Arquivo / File:** `components/Node/Init.vue`

```vue
<script setup>
import { Handle, Position } from "@vue-flow/core"

defineProps({
  node: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<template>
  <Handle :id="`init-source-${node.id}`" type="source" :position="Position.Right" />
  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-[#2DAD72] text-sm font-semibold">
      <UIcon name="material-symbols:flash-on-outline" />
      <p>Bloco Inicial</p>
    </section>
    <p class="text-gray-500 font-normal text-sm">
      a automação começa neste bloco. Conecte-o com outro bloco de conteúdo
    </p>
  </section>
</template>
```

### Node de Conteúdo / Content Node

**Arquivo / File:** `components/Node/Content.vue`

```vue
<script setup>
import { Handle, Position } from "@vue-flow/core"

defineProps({
  id: {
    type: String,
    required: true,
    default: () => {},
  },
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
})
</script>

<template>
  <Handle :id="`content-source-${id}`" type="target" :position="Position.Left" />
  <Handle :id="`content-source-${id}`" type="source" :position="Position.Right" />

  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <p class="text-lg">
        <UIcon
          name="material-symbols:inventory-2-outline"
          class="relative top-[0.2rem]"
        />
        Grupo {{ id }}
      </p>
    </section>
    <FlowsCommands :id="id" :data="data.commands" />
  </section>
</template>
```

---

## 🔧 Elementos Iniciais / Initial Elements

**Arquivo / File:** `utils/initial-elements.ts`

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
          label: "Texto",
          description: "Enviei uma mensagem de texto ao cliente.",
          type: "text",
          action: "message",
          value: "Olá, tudo bem?",
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

---

## 🎨 Estilos / Styles

**Arquivo / File:** `assets/scss/vue-flow.scss`

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

  &.init {
    background: #2DAD721A;
  }

  &.content {
    background: #ECEEF2;
  }
}
```

**Arquivo / File:** `assets/scss/main.scss`

```scss
/* Estilos necessários para o VueFlow / Required styles for VueFlow */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';

/* Tema padrão (opcional) / Default theme (optional) */
@import '@vue-flow/core/dist/theme-default.css';
@import "animations.scss";
@import "vue-flow.scss";
```

---

## 📦 Configuração / Configuration

**Arquivo / File:** `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  ssr: false, // VueFlow requer renderização client-side / VueFlow requires client-side rendering
  
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    // ... outros módulos / other modules
  ],
  
  css: ["~/assets/scss/main.scss"],
  
  // ... outras configurações / other configurations
})
```

---

## 📚 Para mais informações / For more information:

- [Tutorial Completo em Português](./TUTORIAL_VUEFLOW.md)
- [Complete Tutorial in English](./TUTORIAL_VUEFLOW_EN.md)
- [VueFlow Documentation](https://vueflow.dev)
