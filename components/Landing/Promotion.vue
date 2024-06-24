<template>
  <ULandingSection id="promotion">
    <div class="mt-[50px]">
      <div class="text-center max-w-[610px] m-auto relative">
        <h1 class="text-[32px] font-bold primary-color flex flex-wrap justify-center">
          <span>Pronto para usar</span>
          <span class="highlight">
            MarinaBot?
            <NuxtImg class="absolute top-[-37px] right-[-60px]" src="multi-lines.svg" />
            <NuxtImg
              class="absolute bottom-[-7px] right-[15px]"
              src="line.svg"
              width="145"
              height="11"
            />
          </span>
        </h1>
        <p class="text-[16px] secondary-color mt-7 font-light">
          Diga adeus à burocracia. Crie sua conta gratuita e veja a MarinaBot em ação
        </p>
        <div class="flex justify-center mt-10">
          <UButton
            label="Teste grátis por 30 dias"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            class="py-[12px] px-[20px] gap-[10px] md:w-auto md:mr-5 md:mb-0 font-semibold primary-bg animate__animated animate__rubberBand"
            block
          />
        </div>
      </div>
    </div>
  </ULandingSection>
</template>

<script lang="ts" setup></script>

<style></style>
