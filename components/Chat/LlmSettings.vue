<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="p-4 flex-1 space-y-6 overflow-y-auto">
      <ChatRangeInput
        v-model="automation.temperature"
        label="Temperatura"
        :min="0"
        :max="5"
        :step="0.1"
      />

      <ChatRangeInput
        v-model="automation.maxTokens"
        label="Máximo de Tokens"
        :min="1"
        :max="4096"
      />

      <UFormGroup label="Prompt de Regras">
        <UTextarea v-model="automation.systemPrompt" :rows="10" />
      </UFormGroup>

      <div class="flex items-center justify-between">
        <span>Resposta em stream</span>
        <UToggle v-model="automation.stream" />
      </div>

      <UAccordion :items="accordionItems" color="white" variant="solid" size="md">
        <template #item>
          <UCard :ui="{ body: { base: 'space-y-6', padding: 'p-4 sm:p-4' } }">
            <ChatRangeInput
              v-model="automation.topP"
              label="Top P"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <ChatRangeInput v-model="automation.topK" label="Top K" :min="1" :max="50" />

            <ChatRangeInput
              v-model="automation.frequencyPenalty"
              label="Penalidade de frequência"
              :min="0"
              :max="2"
              :step="0.1"
            />

            <ChatRangeInput
              v-model="automation.presencePenalty"
              label="Penalidade de presença"
              :min="0"
              :max="2"
              :step="0.1"
            />
          </UCard>
        </template>
      </UAccordion>
    </div>
    <div class="p-2"></div>
  </div>
</template>

<script setup lang="ts">
import type { IAutomation } from "~~/types"

const flowsStore = useFlowsStore()
const { automation } = storeToRefs(flowsStore)

const llmParams = defineModel("llmParams", {
  type: Object as () => IAutomation,
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
