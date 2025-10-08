# VueFlow - Guia Rápido / Quick Reference

## 🚀 Instalação Rápida / Quick Installation

```bash
pnpm add @vue-flow/core @vue-flow/minimap
```

## 📦 Imports Essenciais / Essential Imports

```javascript
import { VueFlow, useVueFlow } from "@vue-flow/core"
import { Handle, Position } from "@vue-flow/core"
import { MarkerType } from "@vue-flow/core"
```

## 🎯 Composables Principais / Main Composables

```javascript
const {
  onInit,           // Inicialização / Initialization
  onConnect,        // Conectar nodes / Connect nodes
  addEdges,         // Adicionar edges / Add edges
  addNodes,         // Adicionar nodes / Add nodes
  removeNodes,      // Remover nodes / Remove nodes
  removeEdges,      // Remover edges / Remove edges
  updateNodeData,   // Atualizar dados / Update data
  onNodeClick,      // Click em node / Node click
  onNodesChange,    // Mudança nos nodes / Nodes change
  onEdgesChange,    // Mudança nas edges / Edges change
  setCenter,        // Centralizar / Center
  fitView,          // Ajustar visualização / Fit view
} = useVueFlow()
```

## 🧩 Estrutura de Node / Node Structure

```typescript
{
  id: "1",                      // ID único / Unique ID
  type: "custom",               // Tipo customizado / Custom type
  position: { x: 0, y: 0 },     // Posição / Position
  data: { /* dados */ },        // Dados customizados / Custom data
  class: "my-class"             // Classes CSS / CSS classes
}
```

## 🔗 Estrutura de Edge / Edge Structure

```typescript
{
  id: "e1-2",                   // ID único / Unique ID
  source: "1",                  // Node origem / Source node
  target: "2",                  // Node destino / Target node
  animated: true,               // Animação / Animation
  markerEnd: MarkerType.ArrowClosed  // Marcador final / End marker
}
```

## 🎨 Componente VueFlow Básico / Basic VueFlow Component

```vue
<template>
  <ClientOnly>
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      :default-viewport="{ zoom: 0.5 }"
      :min-zoom="0.5"
      :max-zoom="3"
      fit-view-on-init
    >
      <template #node-custom="{ data, id }">
        <!-- Seu node customizado / Your custom node -->
      </template>
    </VueFlow>
  </ClientOnly>
</template>
```

## 🔌 Handle (Ponto de Conexão) / Handle (Connection Point)

```vue
<template>
  <!-- Entrada / Input -->
  <Handle 
    type="target" 
    :position="Position.Left" 
    :id="`target-${id}`" 
  />
  
  <!-- Saída / Output -->
  <Handle 
    type="source" 
    :position="Position.Right" 
    :id="`source-${id}`" 
  />
</template>
```

## 📍 Posições do Handle / Handle Positions

```javascript
Position.Top      // Topo / Top
Position.Right    // Direita / Right
Position.Bottom   // Baixo / Bottom
Position.Left     // Esquerda / Left
```

## 🎭 Eventos Principais / Main Events

### Inicialização / Initialization
```javascript
onInit((instance) => {
  instance.fitView()  // Ajustar visualização / Fit view
})
```

### Conectar Nodes / Connect Nodes
```javascript
onConnect((connection) => {
  addEdges(connection)
})
```

### Click em Node / Node Click
```javascript
onNodeClick(({ node }) => {
  console.log('Node clicado:', node.id)
})
```

### Mudanças em Nodes / Node Changes
```javascript
onNodesChange((changes) => {
  changes.forEach(change => {
    if (change.type === 'remove') {
      console.log('Node removido:', change.id)
    }
  })
})
```

## ➕ Adicionar Node / Add Node

```javascript
const addNode = () => {
  addNodes([{
    id: "3",
    type: "content",
    position: { x: 500, y: 500 },
    data: { label: "Novo Node" }
  }])
}
```

## ➕ Adicionar Edge / Add Edge

```javascript
const connectNodes = (sourceId, targetId) => {
  addEdges([{
    id: `e${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    animated: true
  }])
}
```

## 🗑️ Remover Node / Remove Node

```javascript
const deleteNode = (nodeId) => {
  removeNodes([nodeId])
}
```

## 🗑️ Remover Edge / Remove Edge

```javascript
const deleteEdge = (edgeId) => {
  removeEdges([edgeId])
}
```

## 🔄 Atualizar Dados do Node / Update Node Data

```javascript
const updateNode = (nodeId, newData) => {
  updateNodeData(nodeId, newData)
}
```

## 🎯 Centralizar em Node / Center on Node

```javascript
const centerNode = (nodeId) => {
  const node = nodes.value.find(n => n.id === nodeId)
  setCenter(node.position.x, node.position.y, {
    duration: 200,  // Duração da animação / Animation duration
    zoom: 1         // Nível de zoom / Zoom level
  })
}
```

## 🔍 Ajustar Visualização / Fit View

```javascript
// No setup
onInit((instance) => {
  instance.fitView({ padding: 0.2 })
})

// Manualmente / Manually
const { fitView } = useVueFlow()
fitView({ padding: 0.2, duration: 200 })
```

## ✅ Validar Conexão / Validate Connection

```javascript
const isValidConnection = (connection) => {
  // Não permitir self-connection / Don't allow self-connection
  if (connection.source === connection.target) return false
  
  // Não permitir duplicatas / Don't allow duplicates
  const exists = edges.value.some(
    e => e.source === connection.source && 
         e.target === connection.target
  )
  return !exists
}

onConnect((connection) => {
  if (isValidConnection(connection)) {
    addEdges(connection)
  }
})
```

## 🎨 CSS Básico / Basic CSS

```scss
// Importar estilos / Import styles
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

// Node customizado / Custom node
.custom-node {
  background: #ECEEF2;
  border-radius: 10px;
  padding: 20px;
}
```

## 📱 Minimap (Opcional) / Minimap (Optional)

```vue
<script setup>
import { MiniMap } from "@vue-flow/minimap"
</script>

<template>
  <VueFlow>
    <MiniMap />
  </VueFlow>
</template>
```

## 🔧 Props Comuns do VueFlow / Common VueFlow Props

```vue
<VueFlow
  v-model:nodes="nodes"              // Nodes reativos / Reactive nodes
  v-model:edges="edges"              // Edges reativos / Reactive edges
  :default-viewport="{ zoom: 0.5 }"  // Viewport inicial / Initial viewport
  :min-zoom="0.2"                    // Zoom mínimo / Minimum zoom
  :max-zoom="4"                      // Zoom máximo / Maximum zoom
  :pan-on-drag="true"                // Pan ao arrastar / Pan on drag
  :zoom-on-scroll="true"             // Zoom ao scroll / Zoom on scroll
  :zoom-on-pinch="true"              // Zoom ao pinch / Zoom on pinch
  :keyboard="true"                   // Navegação por teclado / Keyboard nav
  fit-view-on-init                   // Ajustar ao iniciar / Fit on init
/>
```

## 🎯 Tipos de Marcadores / Marker Types

```javascript
import { MarkerType } from "@vue-flow/core"

MarkerType.Arrow          // Seta simples / Simple arrow
MarkerType.ArrowClosed    // Seta fechada / Closed arrow
```

## 📊 Store Pinia Exemplo / Pinia Store Example

```typescript
import { defineStore } from "pinia"

export const useFlowsStore = defineStore("flows", {
  state: () => ({
    nodes: [],
    edges: [],
  }),
  
  actions: {
    addNode(node) {
      this.nodes.push(node)
    },
    removeNode(nodeId) {
      this.nodes = this.nodes.filter(n => n.id !== nodeId)
    }
  }
})
```

## 🐛 Problemas Comuns / Common Issues

### Nodes não aparecem / Nodes don't appear
- ✅ Verifique se tem `position` / Check if has `position`
- ✅ Container precisa ter altura / Container needs height
- ✅ Use `ClientOnly` para SSR / Use `ClientOnly` for SSR

### Conexões não funcionam / Connections don't work
- ✅ Handles precisam de IDs únicos / Handles need unique IDs
- ✅ Tipos corretos: `source` e `target` / Correct types
- ✅ Implemente `onConnect` / Implement `onConnect`

### Estilos não aplicam / Styles not applying
- ✅ Importe os CSS do VueFlow / Import VueFlow CSS
- ✅ Verifique classes customizadas / Check custom classes
- ✅ Use `!important` se necessário / Use `!important` if needed

## 📚 Links Úteis / Useful Links

- **Documentação:** https://vueflow.dev
- **Exemplos:** https://vueflow.dev/examples
- **GitHub:** https://github.com/bcakmakoglu/vue-flow
- **Tutorial Completo (PT):** [TUTORIAL_VUEFLOW.md](./TUTORIAL_VUEFLOW.md)
- **Complete Tutorial (EN):** [TUTORIAL_VUEFLOW_EN.md](./TUTORIAL_VUEFLOW_EN.md)
- **Exemplos de Código:** [VUEFLOW_EXAMPLES.md](./VUEFLOW_EXAMPLES.md)

---

**💡 Dica:** Sempre use IDs únicos e valide conexões para evitar problemas!

**💡 Tip:** Always use unique IDs and validate connections to avoid issues!
