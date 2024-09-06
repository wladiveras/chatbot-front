<script setup>
const connectionStore = useConnectionsStore()
const { loading } = storeToRefs(connectionStore)
const toast = useToast()

const message = reactive({
  text: "",
  number: "",
})

const sendMessage = async () => {
  toast.add({
    title: "Atenção!",
    description: "Envio de mensagem disparada com sucesso.",
    icon: "i-heroicons-check-badge",
  })

  await connectionStore.sendMessage(message.number, message.text).finally(() => {
    message.text = ""
    message.number = ""
  })
}

const items = [
  {
    slot: "send_message",
    label: "Mensagem",
    icon: "material-symbols:favorite-outline",
    defaultOpen: true,
    action: () => sendMessage(),
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
      <template #default="{ item, open }">
        <UButton
          color="gray"
          variant="ghost"
          class=""
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }"
        >
          <template #leading>
            <div class="w-10 h-10 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-6 h-6 text-blue-950" />
            </div>
          </template>

          <span class="truncate text-blue-950"> {{ item.label }}</span>

          <template #trailing>
            <div class="ms-auto transform transition-transform duration-200">
              <UButton
                class="bg-blue-950 px-5"
                v-if="open"
                @click.prevent="item.action"
                icon="material-symbols:send"
              >
                Enviar
              </UButton>
              <UIcon
                v-if="!open"
                name="i-heroicons-chevron-right-20-solid"
                class="w-5 h-5 ms-auto transform transition-transform duration-200"
                :class="[open && 'rotate-90']"
              />
            </div>
          </template>
        </UButton>
      </template>
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
        </section>
      </template>
      <template #privacy>xxx </template>
    </UAccordion>
  </section>
</template>
