# Tutorial VueFlow - Como Funciona e Como Implementar

## 📚 Índice

1. [Introdução](#introdução)
2. [O que é VueFlow?](#o-que-é-vueflow)
3. [Instalação](#instalação)
4. [Conceitos Fundamentais](#conceitos-fundamentais)
5. [Implementação Básica](#implementação-básica)
6. [Customização de Nodes](#customização-de-nodes)
7. [Gerenciamento de Estado](#gerenciamento-de-estado)
8. [Estilização](#estilização)
9. [Exemplos Práticos](#exemplos-práticos)
10. [Dicas e Boas Práticas](#dicas-e-boas-práticas)

---

## 🎯 Introdução

Este tutorial explica como o VueFlow está implementado neste projeto de chatbot, demonstrando como criar fluxos de automação visuais e interativos para construir conversas automatizadas.

## 🔍 O que é VueFlow?

VueFlow é uma biblioteca Vue 3 para criar editores de fluxo (flow charts) interativos e personalizáveis. É perfeita para:

- Criar automações visuais
- Desenhar fluxogramas interativos
- Construir editores de workflow
- Visualizar processos e pipelines

**Principais características:**
- Compatível com Vue 3 e Composition API
- Suporte a nodes e edges customizados
- Zoom, pan e fit-view automáticos
- Totalmente reativo e performático
- TypeScript ready

## 📦 Instalação

### 1. Instalar as dependências

```bash
pnpm add @vue-flow/core @vue-flow/minimap
```

### 2. Importar os estilos CSS

No arquivo `assets/scss/main.scss`:

```scss
/* Estilos necessários para o VueFlow */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';

/* Tema padrão (opcional) */
@import '@vue-flow/core/dist/theme-default.css';
```

### 3. Configurar o Nuxt

No `nuxt.config.ts`, certifique-se de que o SSR está desabilitado:

```typescript
export default defineNuxtConfig({
  ssr: false, // VueFlow precisa do client-side rendering
  // ... outras configurações
})
```

## 🧩 Conceitos Fundamentais

### Nodes (Nós)

Os **nodes** são os blocos/elementos do seu fluxo. Cada node tem:

```typescript
{
  id: "1",              // ID único
  type: "init",         // Tipo do node (para customização)
  position: { x: 0, y: 0 }, // Posição no canvas
  data: {               // Dados customizados
    commands: []
  },
  class: "custom-node" // Classes CSS customizadas
}
```

### Edges (Conexões)

As **edges** são as linhas que conectam os nodes:

```typescript
{
  id: "e1-2",           // ID único da conexão
  source: "1",          // ID do node de origem
  target: "2",          // ID do node de destino
  animated: true,       // Animação da linha
  markerEnd: MarkerType.ArrowClosed // Seta no final
}
```

### Handles (Pontos de Conexão)

Os **handles** são os pontos onde as edges podem se conectar:

```vue
<Handle 
  type="source"        // source (saída) ou target (entrada)
  :position="Position.Right"  // Posição: Top, Right, Bottom, Left
  :id="`source-${id}`" // ID único do handle
/>
```

## 🚀 Implementação Básica

### 1. Criar o arquivo de elementos iniciais

Arquivo: `utils/initial-elements.ts`

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

### 2. Criar a página principal com VueFlow

Arquivo: `pages/Flows/[id].vue`

```vue
<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core"

// Importar stores
const flowsStore = useFlowsStore()
const { nodes, edges, selectedNode } = storeToRefs(flowsStore)

// Composables do VueFlow
const {
  onInit,
  onConnect,
  addEdges,
  addNodes,
  onNodeClick,
  setCenter,
} = useVueFlow()

// Inicialização: ajustar a visualização
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView()
})

// Conectar nodes quando usuário arrasta
onConnect((connection) => {
  addEdges(connection)
})

// Ação ao clicar em um node
onNodeClick(({ node }) => {
  if (node.type !== "init") {
    flowsStore.setSelectedNode(node)
    setCenter(node.position.x, node.position.y, { 
      duration: 200, 
      zoom: 1 
    })
  }
})

// Adicionar novo node
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
      <!-- Botão para adicionar novo node -->
      <UButton
        class="absolute right-5 top-5 z-50"
        icon="material-symbols:add"
        size="xl"
        @click="addNewStep"
      />
      
      <!-- Componente VueFlow -->
      <ClientOnly>
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :default-viewport="{ zoom: 0.5 }"
          :min-zoom="0.5"
          :max-zoom="3"
          fit-view-on-init
        >
          <!-- Template para node customizado tipo "init" -->
          <template #node-init="props">
            <NodeInit :node="props" />
          </template>

          <!-- Template para node customizado tipo "content" -->
          <template #node-content="{ data, id }">
            <NodeContent :id="id" :data="data" />
          </template>
        </VueFlow>
      </ClientOnly>
    </section>
  </main>
</template>
```

### 3. Explicação dos eventos principais

#### `onInit(callback)`
Executado quando o VueFlow é inicializado. Útil para configurar a visualização inicial:

```javascript
onInit((vueFlowInstance) => {
  vueFlowInstance.fitView() // Ajusta o zoom para mostrar todos os nodes
})
```

#### `onConnect(callback)`
Executado quando o usuário conecta dois nodes arrastando:

```javascript
onConnect((connection) => {
  addEdges(connection) // Adiciona a nova conexão
})
```

#### `onNodeClick(callback)`
Executado quando um node é clicado:

```javascript
onNodeClick(({ node }) => {
  // Centralizar o node clicado
  setCenter(node.position.x, node.position.y, { 
    duration: 200, // Animação de 200ms
    zoom: 1        // Zoom level
  })
})
```

## 🎨 Customização de Nodes

### Node Inicial (Init)

Arquivo: `components/Node/Init.vue`

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
  <!-- Handle de saída (direita) -->
  <Handle 
    :id="`init-source-${node.id}`" 
    type="source" 
    :position="Position.Right" 
  />
  
  <!-- Conteúdo do node -->
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

### Node de Conteúdo (Content)

Arquivo: `components/Node/Content.vue`

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
  <!-- Handle de entrada (esquerda) -->
  <Handle 
    :id="`content-target-${id}`" 
    type="target" 
    :position="Position.Left" 
  />
  
  <!-- Handle de saída (direita) -->
  <Handle 
    :id="`content-source-${id}`" 
    type="source" 
    :position="Position.Right" 
  />

  <!-- Conteúdo do node -->
  <section class="flex flex-col gap-5 max-w-60">
    <section class="flex items-center gap-3 text-gray-500 text-sm font-semibold">
      <p class="text-lg">
        <UIcon name="material-symbols:inventory-2-outline" />
        Grupo {{ id }}
      </p>
    </section>
    
    <!-- Componente de comandos -->
    <FlowsCommands :id="id" :data="data.commands" />
  </section>
</template>
```

### Posições dos Handles

```typescript
import { Position } from "@vue-flow/core"

// Posições disponíveis:
Position.Top     // Topo
Position.Right   // Direita
Position.Bottom  // Baixo
Position.Left    // Esquerda
```

## 📊 Gerenciamento de Estado

### Store Pinia para Flows

Arquivo: `stores/flows.ts`

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
      // Carregar flow do servidor
      const response = await get(`/flow/${id}`)
      this.nodes = response.node || []
      this.edges = response.edge || []
    },
    
    async updateFlow() {
      // Salvar flow no servidor
      await put(`/flow/${this.flow.id}`, {
        node: this.nodes,
        edge: this.edges,
      })
    },
  },
})
```

### Usando a Store no Componente

```vue
<script setup>
import { useFlowsStore } from "~/stores/flows"

const flowsStore = useFlowsStore()
const { nodes, edges, selectedNode } = storeToRefs(flowsStore)

// Carregar dados ao montar
onMounted(async () => {
  await flowsStore.fetchFlow("flow", route.params.id)
})
</script>
```

## 🎨 Estilização

### Estilos Customizados para Nodes

Arquivo: `assets/scss/vue-flow.scss`

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

  // Node inicial com fundo verde claro
  &.init {
    background: #2DAD721A;
  }

  // Node de conteúdo com fundo cinza
  &.content {
    background: #ECEEF2;
  }
}
```

### Configuração de Viewport

```vue
<VueFlow
  v-model:nodes="nodes"
  v-model:edges="edges"
  :default-viewport="{ zoom: 0.5 }"  // Zoom inicial
  :min-zoom="0.5"                     // Zoom mínimo
  :max-zoom="3"                       // Zoom máximo
  fit-view-on-init                    // Ajustar visualização ao carregar
>
```

## 💡 Exemplos Práticos

### Exemplo 1: Adicionar Node Programaticamente

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
  
  // Centralizar no novo node
  setCenter(newNode.position.x, newNode.position.y, { 
    duration: 200, 
    zoom: 1 
  })
}
```

### Exemplo 2: Conectar Nodes Automaticamente

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

### Exemplo 3: Atualizar Dados de um Node

```javascript
import { useVueFlow } from "@vue-flow/core"

const { updateNodeData } = useVueFlow()

const addCommand = (nodeId, command) => {
  const node = nodes.value.find(n => n.id === nodeId)
  const commands = [...node.data.commands, command]
  
  updateNodeData(nodeId, { commands })
}
```

### Exemplo 4: Remover Node e suas Conexões

```javascript
import { useVueFlow } from "@vue-flow/core"

const { removeNodes, removeEdges } = useVueFlow()

const deleteNode = (nodeId) => {
  // Remove o node
  removeNodes([nodeId])
  
  // Remove edges conectadas ao node
  const connectedEdges = edges.value.filter(
    edge => edge.source === nodeId || edge.target === nodeId
  )
  removeEdges(connectedEdges.map(e => e.id))
}
```

## 🔧 Funcionalidades Avançadas

### Monitorar Mudanças nos Nodes

```javascript
onNodesChange((changes) => {
  changes.forEach(change => {
    if (change.type === 'remove') {
      console.log('Node removido:', change.id)
    }
    if (change.type === 'position') {
      console.log('Node movido:', change.id, change.position)
    }
  })
})
```

### Monitorar Mudanças nas Edges

```javascript
onEdgesChange((changes) => {
  changes.forEach(change => {
    if (change.type === 'remove') {
      console.log('Edge removida:', change.id)
    }
  })
})
```

### Validar Conexões

```javascript
const isValidConnection = (connection) => {
  // Não permitir self-connection
  if (connection.source === connection.target) {
    return false
  }
  
  // Não permitir conexões duplicadas
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

## 📱 Minimap (Opcional)

Para adicionar um minimapa de navegação:

```vue
<script setup>
import { VueFlow } from "@vue-flow/core"
import { MiniMap } from "@vue-flow/minimap"
</script>

<template>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <!-- Seus templates de nodes -->
    
    <!-- Minimap -->
    <MiniMap />
  </VueFlow>
</template>
```

## 📋 Dicas e Boas Práticas

### 1. Use ClientOnly para SSR

```vue
<ClientOnly>
  <VueFlow v-model:nodes="nodes" v-model:edges="edges">
    <!-- ... -->
  </VueFlow>
</ClientOnly>
```

### 2. IDs Únicos

Sempre use IDs únicos para nodes e edges:

```javascript
const newNodeId = `node-${Date.now()}`
const newEdgeId = `edge-${sourceId}-${targetId}`
```

### 3. Persistência de Dados

Salve o estado dos nodes e edges regularmente:

```javascript
watch([nodes, edges], () => {
  // Debounce para evitar muitas requisições
  debouncedSave()
}, { deep: true })
```

### 4. Performance

Para grandes fluxos, considere:
- Virtualização de nodes
- Lazy loading de dados
- Limitar o número de nodes visíveis

### 5. Acessibilidade

```vue
<VueFlow
  :nodes="nodes"
  :edges="edges"
  :keyboard="true"  // Habilitar navegação por teclado
  :pan-on-drag="true"
  :zoom-on-scroll="true"
>
```

### 6. Validação de Dados

Valide os dados antes de criar nodes:

```javascript
const createNode = (data) => {
  if (!data.id || !data.position) {
    throw new Error('Node inválido: falta id ou position')
  }
  
  addNodes([data])
}
```

## 🐛 Troubleshooting

### Problema: Nodes não aparecem

**Solução:** Verifique se:
- Os nodes têm `position` definida
- O VueFlow está dentro de um container com altura definida
- ClientOnly está sendo usado (para SSR)

### Problema: Conexões não funcionam

**Solução:** Certifique-se de que:
- Os Handles têm IDs únicos
- Os types dos Handles são corretos (`source` e `target`)
- O evento `onConnect` está implementado

### Problema: Estilos não aplicam

**Solução:**
- Importe os CSS do VueFlow corretamente
- Verifique se as classes customizadas estão no SCSS
- Use `!important` se necessário para sobrescrever estilos padrão

## 📚 Recursos Adicionais

- **Documentação Oficial:** [https://vueflow.dev](https://vueflow.dev)
- **Exemplos:** [https://vueflow.dev/examples](https://vueflow.dev/examples)
- **GitHub:** [https://github.com/bcakmakoglu/vue-flow](https://github.com/bcakmakoglu/vue-flow)

## 🎓 Conclusão

Este tutorial cobriu:
- ✅ Instalação e configuração do VueFlow
- ✅ Conceitos fundamentais (nodes, edges, handles)
- ✅ Implementação de nodes customizados
- ✅ Gerenciamento de estado com Pinia
- ✅ Estilização e personalização
- ✅ Exemplos práticos e casos de uso
- ✅ Boas práticas e troubleshooting

Com este conhecimento, você está pronto para criar fluxos de automação complexos e interativos usando VueFlow no seu projeto Vue 3!

---

**Última atualização:** 2024
**Versão do VueFlow:** 1.41.1
**Versão do Vue:** 3.x
