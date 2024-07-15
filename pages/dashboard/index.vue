<template>
  <div>
    <ULandingSection>
      <div>
        <div class="md:text-left relative flex flex-wrap items-center justify-between">
          <div>
            <h1
              class="text-[32px] font-bold text-blue-950 flex flex-wrap lg:justify-left"
            >
              Minhas conexões
            </h1>
            <p class="text-[16px] text-gray-500 border-gray-10 mt-1 font-light text-left">
              Você tem <span class="font-semibold">3</span> conexões ativas
            </p>
          </div>
          <div class="relative ml-5 mt-[40px]">
            <UButton
              @click="ModalStore.toggle"
              label="Nova conexão"
              icon="ic:baseline-whatsapp"
              class="py-[12px] px-[20px] font-normal bg-blue-950"
              block
            />
            <NuxtImg src="/multi-lines.svg" class="absolute top-[-50px] right-[-60px]" />
          </div>
        </div>
        <div class="relative">
          <div>
            <div>{{ user }} xx</div>
          </div>
        </div>
      </div>
    </ULandingSection>
    <DashboardModalQrCode />
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from "@/stores/modal"

definePageMeta({
  layout: "dashboard",
})

const user = useSupabaseUser()
const ModalStore = useModalStore()
</script>

<style></style>
