<script lang="ts" setup></script>
<template>
  <ULandingSection>
    <div>
      <div class="text-center max-w-[804px] m-auto relative border-b text-gray-500 border-gray-10">
        <h1 class="text-[48px] font-bold text-blue-950 flex flex-wrap justify-center">
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

        <p class="text-gray-500 border-gray-10 mt-7 font-light animate__animated animate__jello">
          Aumente de maneira significante suas vendas, automatize respostas para
          economizar tempo e conquiste seus contatos com facilidade!
        </p>
        <div class="flex flex-wrap md:flex-nowrap justify-center mt-[50px]">
          <UButton
            label="Teste grátis por 30 dias"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            class="py-[12px] px-[20px] gap-[10px] mb-5 w-full md:w-auto md:mr-5 md:mb-0 font-semibold bg-blue-950 animate__animated animate__rubberBand"
            block
          />
          <UButton
            label="Conheça nossos planos"
            class="py-[12px] px-[20px] gap-[10px] w-full md:w-auto md:ml-5 font-semibold bg-gray-100 text-blue-950 animate__animated animate__rubberBand"
            block
          />
        </div>

        <p
          class="text-gray-500 border-gray-10 mt-7 font-light text-sm mb-10 animate__animated animate__pulse"
        >
          <UIcon name="uil:arrow-growth" color="green" size="30px" />
          Mais de 987 clientes aumentaram suas vendas.
        </p>
      </div>
      <div
        class="flex gap-10 flex-wrap mt-[50px] lg:gap-0 lg:flex-nowrap lg:justify-between animate__animated animate__backInRight"
      >
        <div class="flex lg:max-w-[300px] items-center">
          <NuxtImg src="/icon_1.svg" />
          <span class="font-light text-gray-500 border-gray-10 ml-5">
            Respostas rápidas e automáticas.
          </span>
        </div>
        <div class="flex lg:max-w-[300px] items-center">
          <NuxtImg src="/icon_2.svg" />
          <span class="font-light text-gray-500 border-gray-10 ml-5">
            Converta mais clientes e aumente suas vendas.
          </span>
        </div>
        <div class="flex lg:max-w-[300px] items-center">
          <NuxtImg src="/icon_3.svg" />
          <span class="font-light text-gray-500 border-gray-10 ml-5">
            Não perca tempo, automatize!
          </span>
        </div>
      </div>
      <div class="border-b text-gray-500 border-gray-10 mt-16" />
    </div>
  </ULandingSection>
</template>

<style></style>
