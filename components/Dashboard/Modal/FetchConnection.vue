<script setup lang="ts">
const props = defineProps({
  connection_id: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(["success"])

const modal = useModal()
const connectionStatus = ref(null)
const connectionStore = useConnectionsStore()
const { getQrcode } = storeToRefs(connectionStore)

onMounted(async () => {
  await connectionStore.fetchConnection(props.connection_id).then(() => {
    connectionStatus.value = setInterval(async () => {
      await connectionStore.connectionStatus()
    }, 29000)
  })

  await connectionStore.connectionStatus()
})

function handleClose() {
  if (connectionStatus.value) {
    clearInterval(connectionStatus.value)
  }
  emit("success")
  modal.close()
}
</script>

<template>
  <UModal prevent-close>
    <section class="flex flex-col items-center gap-1 p-10 rounded-full">
      <UIcon
        @click="modal.close()"
        name="material-symbols-light:close"
        class="self-end cursor-pointer"
        size="30px"
      />
      <section class="flex justify-center items-center flex-col">
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
              @click="handleClose"
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
