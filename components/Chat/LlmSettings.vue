<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="p-4 flex-1 space-y-6 overflow-y-auto">
      <ChatRangeInput
        v-model="llmParams.temperature"
        label="Temperatura"
        :min="0"
        :max="5"
        :step="0.1"
      />

      <ChatRangeInput
        v-model="llmParams.maxTokens"
        label="Máximo de Tokens"
        :min="1"
        :max="4096"
      />

      <UFormGroup label="Prompt de Regras">
        <UTextarea v-model="llmParams.systemPrompt" :rows="10" :maxrows="8" autoresize />
      </UFormGroup>

      <div class="flex items-center justify-between">
        <span>Resposta em stream</span>
        <UToggle v-model="llmParams.stream" />
      </div>

      <UAccordion :items="accordionItems" color="white" variant="solid" size="md">
        <template #item>
          <UCard :ui="{ body: { base: 'space-y-6', padding: 'p-4 sm:p-4' } }">
            <ChatRangeInput
              v-model="llmParams.topP"
              label="Top P"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <ChatRangeInput v-model="llmParams.topK" label="Top K" :min="1" :max="50" />

            <ChatRangeInput
              v-model="llmParams.frequencyPenalty"
              label="Penalidade de frequência"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <ChatRangeInput
              v-model="llmParams.presencePenalty"
              label="Penalidade de presença"
              :min="0"
              :max="2"
              :step="0.1"
            />
          </UCard>
        </template>
      </UAccordion>

      <UButton color="gray" size="sm" block @click="$emit('reset')">
        Reiniciar configurações
      </UButton>
    </div>
    <div class="p-2"></div>
  </div>
</template>

<script setup lang="ts">
import type { LlmParams } from "~~/types"

const llmParams = defineModel("llmParams", {
  type: Object as () => LlmParams,
  required: true,
})

defineEmits(["hideDrawer", "reset"])

const accordionItems = [
  {
    label: "Configurações avançadas",
    defaultOpen: false,
  },
]
</script>
