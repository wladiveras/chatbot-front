<script setup>
const connectionStore = useConnectionsStore()
const { loading } = storeToRefs(connectionStore)
const toast = useToast()

const message = reactive({
  text: "",
  number: "",
})

const sendMessage = async () => {
  await connectionStore
    .sendMessage(message.number, message.text)
    .then(() => {
      toast.add({
        title: "Atenção!",
        description: "Mensagem enviada com sucesso.",
        icon: "i-heroicons-check-badge",
      })
    })
    .catch(() => {
      toast.add({
        title: "Atenção!",
        description: "Não foi possível enviar a mensagem.",
        icon: "material-symbols:error-outline",
      })
    })
}

const items = [
  {
    slot: "send_message",
    label: "Enviar Mensagem",
    icon: "material-symbols:favorite-outline",
    defaultOpen: true,
  },
  {
    slot: "privacy",
    label: "Privacidade",
    icon: "material-symbols:lock-outline",
  },
]
</script>
<template>
  <section class="text-blue-950">
    <UAccordion
      :items="items"
      :ui="{
        wrapper: 'w-full flex flex-col',
        item: {
          base: 'text-blue-950',
          size: 'text-sm',
          color: 'text-gray-500 dark:text-gray-400',
          padding: 'px-3',
          icon: 'ms-auto transform transition-transform duration-200',
        },
      }"
    >
      <template #send_message>
        <section class="flex flex-col gap-4">
          <UFormGroup
            label="Telefone"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500',
              },
            }"
          >
            <UInput
              v-model="message.number"
              v-masked="false"
              v-mask="['+55 (##) ####-####', '+55 (##) #####-####']"
            />
          </UFormGroup>
          <UFormGroup
            label="Mensagem"
            :ui="{
              label: {
                base: 'text-xs font-semibold text-gray-500',
              },
            }"
          >
            <UTextarea v-model="message.text" />
          </UFormGroup>
          <UFormGroup>
            <UButton
              class="bg-blue-950 text-white"
              icon="material-symbols:send"
              :label="loading ? 'Enviando mensagem...' : 'Enviar Mensagem'"
              @click="sendMessage"
              :loading="loading"
              variant="soft"
              block
            ></UButton>
          </UFormGroup>
        </section>
      </template>
      <template #privacy>xxx </template>
    </UAccordion>
  </section>
</template>
