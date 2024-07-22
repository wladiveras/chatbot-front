<script setup lang="ts">
import { useModalStore } from "@/stores/modal"

const modalStore = useModalStore()
const { isOpen } = storeToRefs(modalStore)
</script>

<template>
  <UModal v-model="isOpen">
    <section class="flex flex-col items-center gap-5 p-10">
      <!-- Close modal -->
      <UIcon
        @click="modalStore.toggle"
        name="material-symbols-light:close"
        class="self-end cursor-pointer"
        size="30px"
      />
      <!-- QRCode -->
      <NuxtImg class="p-2 border-2 max-w-60 max-h-60 rounded-xl border-[#46C78B]" src="/qr-code.png" />
      <section class="flex flex-col w-full gap-10">
        <!-- Title -->
        <p class="text-blue-950 font-semibold text-lg">Siga as instruções abaixo:</p>
        <!-- Passo a passo -->
        <section class="flex flex-col w-full gap-10">
          <ul class="flex flex-col gap-5 text-blue-950 font-normal text-sm">
            <!-- Passo 1 -->
            <li>
              1. Abra o WhatsApp no seu celular.
            </li>
            <!-- Passo 2 -->
            <li>
              2. Toque em <strong>Mais opções</strong> 
              <UIcon class="p-1 bg-gray-200 rounded ml-1" name="material-symbols:more-vert" size="24px" />
              no Android ou em <strong>Configurações</strong> <UIcon class="p-1 bg-gray-200 rounded ml-1" name="material-symbols:settings-outline" size="24px" /> no iPhone.
            </li>
            <!-- Passo 3 -->
            <li>
              3. Toque em <strong>Dispositivos conectados</strong> e, em seguida, em <strong>Conectar dispositivo</strong>.
            </li>
            <!-- Passo 4 -->
            <li>
              4. Aponte seu celular para esta tela para escanear o QR code.
            </li>
          </ul>
        </section>
      </section>
    </section>
  </UModal>
</template>
