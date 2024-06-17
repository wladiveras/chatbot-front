<template>
  <div>
    <ULandingSection>
      <div>
        <div class="md:text-left relative flex flex-wrap items-center justify-between">
          <div>
            <h1
              class="text-[32px] font-bold primary-color flex flex-wrap lg:justify-left"
            >
              Minhas conexões
            </h1>
            <p class="text-[16px] secondary-color mt-1 font-light text-left">
              Você tem <span class="font-semibold">3</span> conexões ativas
            </p>
          </div>
          <div class="relative ml-5 mt-[40px]">
            <UButton
              label="Nova conexão"
              icon="ic:baseline-whatsapp"
              class="py-[12px] px-[20px] font-normal primary-bg"
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
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
})

const user = useSupabaseUser()
</script>

<style></style>
