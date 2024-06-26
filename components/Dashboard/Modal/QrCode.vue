<script setup lang="ts">
import { useModalStore } from "@/stores/modal"

const modalStore = useModalStore()
const { isOpen } = storeToRefs(modalStore)
</script>

<template>
  <UModal v-model="isOpen">
    <div>
      <div>
        <!-- QrCode Imagem -->
        <div class="display flex justify-center pt-[100px] p-10 flex-wrap">
          <UIcon
            @click="modalStore.toggle"
            name="material-symbols-light:close"
            class="absolute top-6 right-6 cursor-pointer h-100"
            size="30px"
          />
          <NuxtImg class="border-2 rounded border-pink-400" src="/qr-code.png" />
        </div>

        <!-- Texto com titulo de etapas -->
        <div></div>
      </div>
    </div>
  </UModal>
</template>
