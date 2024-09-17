<script setup lang="ts">
import type { ChatMessage, IAutomation, LoadingType } from "~~/types"

const route = useRoute()
const sidebarStore = useSidebarStore()
const flowsStore = useFlowsStore()
const { isExpanded } = storeToRefs(sidebarStore)
const { automation } = storeToRefs(flowsStore)

const isDrawerOpen = ref(false)

const defaultSettings: IAutomation = {
  model: "@cf/meta/llama-3.1-8b-instruct",
  temperature: automation.value.temperature ?? 0.6,
  maxTokens: automation.value.maxTokens ?? 512,
  systemPrompt: automation.value.systemPrompt ?? "Diga como a IA deve se comportar.",
  stream: automation.value.stream ?? true,
}

const llmParams = reactive<IAutomation>({ ...defaultSettings })
const resetSettings = () => {
  Object.assign(llmParams, defaultSettings)
}

const { getResponse, streamResponse } = useChat()
const chatHistory = ref<ChatMessage[]>([])

// todo: load all messages from the current flow
//chatHistory.value.push({ role: "user", content: "tudo bem?" })

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
    console.log(chatHistory.value)
  }
}

if (isExpanded.value) {
  sidebarStore.toggleSize()
}

const resetSidebar = () => {
  sidebarStore.toggleSize()
}

onMounted(async () => {
  await flowsStore.fetchFlow("automation", route.params?.id)
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
