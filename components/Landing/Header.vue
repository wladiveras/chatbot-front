<script lang="ts" setup></script>
<template>
  <ULandingSection>
    <div>
      <div class="text-center max-w-[804px] m-auto relative border-b secondary-color">
        <h1 class="text-[48px] font-bold primary-color flex flex-wrap justify-center">
          <span>Revolucione suas vendas</span>
          <span class="highlight">
            com
            <NuxtImg
              class="absolute top-[-25px] right-[-50px] hidden lg:flex"
              src="multi-lines.svg"
            />
          </span>
          <span>automação de</span>
          <span class="highlight">
            WhatsApp!
            <NuxtImg
              class="absolute bottom-[-7px] right-[45px]"
              src="line.svg"
              width="198"
              height="15"
            />
          </span>
        </h1>

        <p class="secondary-color mt-7 font-light">
          Aumente de maneira significante suas vendas, automatize respostas para
          economizar tempo e conquiste seus contatos com facilidade!
        </p>
        <div class="flex flex-wrap md:flex-nowrap justify-center mt-[50px]">
          <UButton
            label="Teste grátis por 30 dias"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            class="py-[12px] px-[20px] gap-[10px] mb-5 w-full md:w-auto md:mr-5 md:mb-0 font-semibold primary-bg"
            block
          />
          <UButton
            label="Conheça nossos planos"
            class="py-[12px] px-[20px] gap-[10px] w-full md:w-auto md:ml-5 font-semibold bg-pink-100 text-pink-500"
            block
          />
        </div>

        <p class="secondary-color mt-7 font-light text-sm mb-10">
          <UIcon name="uil:arrow-growth" color="green" size="30px" />
          Mais de 987 clientes aumentaram suas vendas.
        </p>
      </div>
      <div
        class="flex gap-10 flex-wrap mt-[50px] lg:gap-0 lg:flex-nowrap lg:justify-between"
      >
        <div class="flex lg:max-w-[300px] items-center">
          <NuxtImg src="/icon-1.png" />
          <span class="font-light secondary-color ml-5">
            Respostas rápidas e automáticas.
          </span>
        </div>
        <div class="flex lg:max-w-[300px] items-center">
          <NuxtImg src="/icon-2.png" />
          <span class="font-light secondary-color ml-5">
            Converta mais clientes e aumente suas vendas.
          </span>
        </div>
        <div class="flex lg:max-w-[300px] items-center">
          <NuxtImg src="/icon-3.png" />
          <span class="font-light secondary-color ml-5">
            Não perca tempo, automatize!
          </span>
        </div>
      </div>
    </div>
  </ULandingSection>
</template>

<style></style>
