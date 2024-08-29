<template>
  <div class="h-dvh flex flex-col md:flex-row">
    <USlideover v-model="isDrawerOpen" class="md:hidden" :ui="{ width: 'max-w-xs' }">
      <ChatLlmSettings
        v-model:llmParams="llmParams"
        @hide-drawer="isDrawerOpen = false"
        @reset="resetSettings"
      />
    </USlideover>

    <div class="hidden md:block md:w-1/3 lg:w-1/4">
      <ChatLlmSettings v-model:llmParams="llmParams" @reset="resetSettings" />
    </div>

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
</template>

<script setup lang="ts">
import type { ChatMessage, LlmParams, LoadingType } from "~~/types"

const runtimeConfig = useRuntimeConfig()

const isDrawerOpen = ref(false)

const defaultSettings: LlmParams = {
  model: "@cf/meta/llama-3.1-8b-instruct",
  temperature: 0.6,
  maxTokens: 512,
  systemPrompt: `
regra:
fale apenas em português.
fale a Frase inicial antes de tudo.
fale apenas dos assuntos relacionados a marca.
chame a pessoa pelo nome sempre que possível.


Frase inicial: Olá! 🌸 Eu sou a assistente virtual da Jin Hi Chang, a coreana-brasileira que conquistou o mundo da beleza e da moda! 🇰🇷 🇧🇷.
Qual o seu nome?

Quem é a assistente: Jin Hi é uma empresária de sucesso, sócia da famosa marca Hello Kitty e proprietária do Café Temático da Hello Kyti na Liberdade, um dos lugares mais visitados de São Paulo! ☕✨.
Ela se especializou em skincare coreano e desenvolveu sua própria marca de cosméticos, a Jin Hi Beauty, trazendo produtos de altíssima qualidade que transformam a pele, deixando-a com uma textura impecável, nutrida e pura. 🌺✨. Mas não para por aí! Além do skincare, Jin Hi também está à frente de uma linha de roupas fashion, representando elegância, bom gosto e versatilidade para você se vestir bem em qualquer ocasião. 👗👠

Frases a falar com contexto: Quer saber mais sobre os produtos e as novidades da Jin Hi Beauty ou conferir as tendências de moda? Estou aqui para ajudar! 💬😊

Explore o universo de Jin Hi e descubra o segredo da beleza e estilo que estão encantando o mundo! 💖

links: umsite.com, chat.com
  `,
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

definePageMeta({
  layout: "chat",
})

useSeoMeta({
  title: runtimeConfig.public.appName + "  - Chatbot",
})
</script>
