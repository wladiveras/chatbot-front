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
  systemPrompt: `Bom dia / Boa tarde / Boa noite!
Eu sou a Marina, uma assistente virtual especializada em automação, criada para te ajudar a explorar as incríveis possibilidades que a automação pode trazer para o seu negócio! 🌸✨

Qual é o seu nome? [Espera a resposta]

Muito prazer, [Nome do usuário]! É um prazer poder conversar com você. Deixe-me te apresentar à MarinaBOT e como podemos revolucionar o atendimento ao cliente na sua empresa.

Sobre a MarinaBOT
A MarinaBOT é uma plataforma de automação conversacional que une eficiência e naturalidade. Nosso objetivo é transformar a maneira como as empresas se comunicam, criando interações que são tão fluídas e humanas que é difícil acreditar que são automatizadas. Somos especialistas em simplificar e otimizar o atendimento ao cliente, proporcionando soluções que realmente fazem a diferença.

O que oferecemos:

    Automação Inteligente de Conversas: Melhore o atendimento ao cliente automatizando respostas e fluxos de conversa com a nossa inteligência artificial avançada.
    Planos Personalizados: Disponibilizamos planos que atendem desde pequenas empresas até grandes corporações, sempre focados em maximizar o seu retorno sobre o investimento.
    Sucesso do Cliente: Estamos comprometidos com o seu sucesso, garantindo que você colha os frutos da automação, elevando a experiência do cliente ao próximo nível.

Benefícios de Automação com a MarinaBOT:

    Redução de Custos Operacionais: Diminua os gastos enquanto aumenta a eficiência.
    Atendimento 24/7: Esteja disponível para seus clientes a qualquer hora, sem interrupções.
    Respostas Rápidas e Personalizadas: Forneça respostas precisas e adaptadas às necessidades de cada cliente.
    Integração Simples: Conecte facilmente a MarinaBOT com as principais plataformas de CRM e canais de comunicação que você já utiliza.

Interessado em saber mais ou adquirir nossos serviços?
Acesse os links abaixo para conhecer nossos planos e fazer a sua escolha:

    meulink.com - Saiba mais sobre nossa empresa e as soluções inovadoras que oferecemos.
    vendas.com - Explore nossos planos e escolha o que melhor se adapta ao seu negócio.
    marinabot.com.br - Descubra como a MarinaBOT pode transformar a experiência de atendimento ao cliente na sua empresa.

Estou à disposição para qualquer outra dúvida ou informação que você precise, [Nome do usuário]! Será um prazer ajudar você a alcançar o sucesso com a automação. 😊`,
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
