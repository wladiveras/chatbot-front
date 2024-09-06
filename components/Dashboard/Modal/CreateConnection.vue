<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

const toast = useToast()
const modal = useModal()

const connectionStatus = ref(null)

const schema = z.object({
  name: z.string().min(5, {
    message: "Informe um nome para a conexão com pelo menos 5 dígitos.",
  }),
  description: z.string().max(34, {
    message: "Informe uma descrição para a descrição até 34 dígitos.",
  }),
  connection_key: z.string().min(1, {
    message: "Informe um telefone válido para criar uma conexão.",
  }),
})

type Schema = z.output<typeof schema>

const connectionStore = useConnectionsStore()
const { ConnectionPayload, getQrcode, isLoading } = storeToRefs(connectionStore)
const emit = defineEmits(["success", "close"])

connectionStore.init()

const createConnection = async (event: FormSubmitEvent<Schema>) => {
  await connectionStore
    .createConnection()
    .then(() => {
      toast.add({
        title: "Atenção!",
        description: `Conexão ${ConnectionPayload.value.connection_key} criada com sucesso.`,
        icon: "i-heroicons-check-badge",
      })

      emit("success")

      connectionStatus.value = setInterval(async () => {
        await connectionStore.connectionStatus()
      }, 29000)
    })
    .catch(() => {
      toast.add({
        title: "Atenção!",
        description: "Não foi possível criar a conexão.",
        icon: "material-symbols:error-outline",
      })
    })
}

const closeModal = () => {
  if (connectionStatus.value) {
    clearInterval(connectionStatus.value)
  }
  emit("close")
  modal.close()
}
</script>

<template>
  <UModal prevent-close>
    <section class="flex flex-col items-center gap-1 p-10 rounded-full">
      <UIcon
        @click="closeModal"
        name="material-symbols-light:close"
        class="self-end cursor-pointer"
        size="30px"
      />

      <section class="flex flex-col w-full gap-10" v-if="!getQrcode">
        <UForm
          :schema="schema"
          :state="ConnectionPayload"
          :ui="{ base: 'text-center', footer: 'text-center' }"
          :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
          class="space-y-4"
          @submit="createConnection"
        >
          <span class="text-gray-500 font-semibold text-md mb-3 block">
            Informações essências da conexão
          </span>

          <UFormGroup name="name">
            <UInput
              size="lg"
              class="block"
              v-model="ConnectionPayload.name"
              placeholder="informe o nome da conexão"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup name="description">
            <UInput
              size="lg"
              class="block"
              v-model="ConnectionPayload.description"
              placeholder="Descrição da conexão"
              variant="outline"
            />
          </UFormGroup>

          <UFormGroup name="connection_key">
            <UInput
              size="lg"
              class="block"
              type="tel"
              v-model="ConnectionPayload.connection_key"
              v-mask="['+55 (##) ####-####', '+55 (##) #####-####']"
              placeholder="Número de telefone. Ex: (11) 99999-9999"
              variant="outline"
            />
          </UFormGroup>

          <UButton
            class="w-full flex text-center py-[15px] px-[25px] bg-blue-950"
            type="submit"
            :loading="isLoading"
            block
          >
            Continuar
          </UButton>
        </UForm>
      </section>

      <!-- QRCode -->
      <section class="flex justify-center items-center flex-col" v-else>
        <NuxtImg
          class="p-2 border-2 max-w-60 flex mb-16 max-h-60 rounded-xl border-[#46C78B]"
          :src="getQrcode"
        />
        <section class="flex flex-col w-full gap-10">
          <p class="text-blue-950 font-semibold text-lg">Siga as instruções abaixo:</p>

          <section class="flex flex-col w-full gap-10">
            <ul class="flex flex-col gap-5 text-blue-950 font-normal text-sm">
              <li>1. Abra o WhatsApp no seu celular.</li>

              <li>
                2. Toque em <strong>Mais opções</strong>
                <UIcon
                  class="p-1 bg-blue-950 rounded ml-1 relative top-[0.4rem]"
                  name="material-symbols:more-vert"
                  size="24px"
                />
                no Android ou em <strong>Configurações</strong>
                <UIcon
                  class="p-1 bg-blue-950 rounded ml-1 relative top-[0.5rem]"
                  name="material-symbols:settings-outline"
                  size="24px"
                />
                no iPhone.
              </li>

              <li>
                3. Toque em <strong>Dispositivos conectados</strong> e, em seguida, em
                <strong>Conectar dispositivo</strong>.
              </li>

              <li>4. Aponte seu celular para esta tela para escanear o QR code.</li>
              <li>
                5. Após ler o QR code, clique no botão <strong>Confirmar conexão</strong>.
              </li>
            </ul>
            <UButton
              class="w-full flex text-center py-[15px] px-[25px] bg-blue-950 text-md"
              type="submit"
              @click="closeModal"
              block
            >
              Confirmar conexão
            </UButton>
          </section>
        </section>
      </section>
    </section>
  </UModal>
</template>
