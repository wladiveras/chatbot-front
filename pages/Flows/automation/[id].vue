<script setup lang="ts">
import type { ChatMessage, LlmParams, LoadingType } from "~~/types"

const route = useRoute()
const sidebarStore = useSidebarStore()
const flowsStore = useFlowsStore()
const { isExpanded } = storeToRefs(sidebarStore)
const { nodes } = storeToRefs(flowsStore)

await flowsStore.fetchFlow(route.params?.id)

const isDrawerOpen = ref(false)

const defaultSettings: LlmParams = {
  model: "@cf/meta/llama-3.1-8b-instruct",
  temperature: 0.6,
  maxTokens: 512,
  systemPrompt: `Regras:
Comece com um bom dia/boa tarde/boa noite a depender do horário de Brasilia.
Pergunte o nome do cliente logo após a saudação.
Fale sempre em português.
Fale apenas dos serviços ofertados
Fale com curtas palavras de forma simples.
Sempre substitua os valores dentro de [] sem digitar essa informação, entenda com  regra.

Marina:
Eu sou a Marina, uma assistente virtual especializada em automação. Estou aqui para te ajudar a explorar as incríveis possibilidades que a automação pode trazer para o seu negócio! 🌸✨

Marina:
Qual é o seu nome? [Espera a resposta]

Marina:
Muito prazer, [Nome do usuário]! É ótimo conversar com você. Vou te contar um pouco mais sobre a MarinaBOT.

Marina:
A MarinaBOT é uma plataforma de automação conversacional que combina eficiência e naturalidade. Nosso objetivo é transformar a comunicação das empresas, criando interações que são tão fluídas e humanas que você nem percebe que são automatizadas.

Marina:
Posso te explicar mais sobre o que oferecemos? 😊

[Aguarda confirmação]

Marina:

    Automação Inteligente de Conversas: Automatize o atendimento ao cliente com nossa IA avançada.
    Planos Personalizados: Temos opções para todos os tamanhos de negócios, sempre focando no máximo retorno para você.
    Sucesso do Cliente: Nosso compromisso é com o seu sucesso, garantindo que você aproveite ao máximo a automação.

Marina:
Quer saber os principais benefícios de usar a MarinaBOT? Posso te passar agora. 😄

[Aguarda confirmação]

Marina:

    Redução de custos operacionais.
    Atendimento 24/7, sem interrupções.
    Respostas rápidas e personalizadas.
    Integração fácil com as principais plataformas de CRM e canais de comunicação.

Marina:
Se você se interessou e quer saber mais, é só acessar os links abaixo. Vou te passar:

Marina:

    meulink.com - Saiba mais sobre nossa empresa e as soluções que oferecemos.
    vendas.com - Explore nossos planos e escolha o que melhor se adapta ao seu negócio.
    marinabot.com.br - Veja como podemos transformar o atendimento ao cliente na sua empresa.

Marina:
Se precisar de mais alguma informação, é só me chamar, [Nome do usuário]! Vou adorar te ajudar a alcançar o sucesso com a automação. 😊`,
  stream: true,
}

const llmParams = reactive<LlmParams>({ ...defaultSettings })
const resetSettings = () => {
  Object.assign(llmParams, defaultSettings)
}

const { getResponse, streamResponse } = useChat()
const chatHistory = ref<ChatMessage[]>([])
const loading = ref<LoadingType>("idle")
async function sendMessage(message: string) {
  chatHistory.value.push({ role: "user", content: message })

  try {
    if (llmParams.stream) {
      loading.value = "stream"
      const messageGenerator = streamResponse("/api/chat", chatHistory.value, llmParams)

      let responseAdded = false
      for await (const chunk of messageGenerator) {
        if (responseAdded) {
          // add the response to the current message
          chatHistory.value[chatHistory.value.length - 1]!.content += chunk
        } else {
          // add a new message to the chat history
          chatHistory.value.push({
            role: "assistant",
            content: chunk,
          })

          responseAdded = true
        }
      }
    } else {
      loading.value = "message"
      const response = await getResponse("/api/chat", chatHistory.value, llmParams)

      chatHistory.value.push({ role: "assistant", content: response })
    }
  } catch (error) {
    console.error("Error sending message:", error)
  } finally {
    loading.value = "idle"
  }
}

if (isExpanded.value) {
  sidebarStore.toggleSize()
}

const resetSidebar = () => {
  sidebarStore.toggleSize()
}

onUnmounted(() => {
  if (!isExpanded.value) {
    resetSidebar()
  }
})

definePageMeta({
  layout: "automation",
})
</script>

<template>
  <main class="flex w-full h-full">
    <aside
      v-if="!isExpanded"
      class="overflow-auto w-full max-w-[500px] h-full border-r border-[#E5E5E5]"
    >
      <header
        class="border-b border-[#E5E5E5] p-5 flex items-center justify-between text-gray-500 font-semibold text-base"
      >
        <section class="flex items-center gap-4">
          <UIcon name="material-symbols:inventory-2-outline" class="size-5" />
          Configurações
        </section>
      </header>
      <section class="flex flex-col p-5 gap-20">
        <ChatLlmSettings v-model:llmParams="llmParams" @reset="resetSettings" />
      </section>
    </aside>
    <section class="relative w-full h-full">
      <div class="flex flex-col md:flex-row">
        <USlideover v-model="isDrawerOpen" class="md:hidden" :ui="{ width: 'max-w-xs' }">
          <ChatLlmSettings
            v-model:llmParams="llmParams"
            @hide-drawer="isDrawerOpen = false"
            @reset="resetSettings"
          />
        </USlideover>

        <UDivider orientation="vertical" class="hidden md:block" />

        <div class="flex-grow md:w-2/3 lg:w-3/4">
          <ChatPanel
            :chat-history="chatHistory"
            :loading="loading"
            @clear="chatHistory = []"
            @message="sendMessage"
            @show-drawer="isDrawerOpen = true"
          />
        </div>
      </div>
    </section>
  </main>
</template>
