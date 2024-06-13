<script setup lang="ts"></script>

<template>
  <ULandingSection>
    <div class="mt-[50px] gap-10">
      <div class="text-center max-w-[804px] m-auto relative">
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
          Aumente significamente suas vendas, automatize respostas para economizar tempo e
          reconquiste seus contatos com facilidade!
        </p>
        <div class="flex justify-center mt-[50px]">
          <UButton
            label="Teste grátis por 30 dias"
            trailing-icon="i-heroicons-arrow-right-20-solid"
            class="py-[12px] px-[20px] gap-[10px] mr-5 font-semibold"
          />
          <UButton
            label="Conheça nossos planos"
            class="py-[12px] px-[20px] gap-[10px] ml-5 font-semibold bg-blue-200 text-blue-500"
          />
        </div>

        <p class="secondary-color mt-7 font-light text-sm">
          <UIcon name="uil:arrow-growth" color="green" size="30px" /> Mais de 987 clientes
          aumentaram suas vendas.
        </p>
      </div>
    </div>
  </ULandingSection>
  <ULandingSection>
    <div class="mt-[50px]">
      <div class="text-center lg:text-left max-w-[610px] relative">
        <span class="font-semibold primary-pink">■ Recursos</span>
        <h1
          class="text-[32px] font-bold primary-color flex flex-wrap justify-center lg:justify-left"
        >
          Descubra como a MarinaBot pode impulsionar suas vendas!
        </h1>
      </div>
    </div>
  </ULandingSection>
  <ULandingSection>
    <div class="mt-[50px]">
      <div class="text-center max-w-[610px] m-auto relative">
        <span class="font-semibold primary-pink">Planos e preços</span>
        <h1 class="text-[32px] font-bold primary-color flex flex-wrap justify-center">
          <span>Comece </span>
          <span class="highlight">
            grátis
            <NuxtImg
              class="absolute bottom-[0px] right-[-20px]"
              src="line.svg"
              width="145"
              height="11"
            />
          </span>
        </h1>
        <p class="text-[16px] secondary-color mt-7 font-light">
          Preços simples, sem taxas ocultas, recursos avançados para sua empresa
        </p>
      </div>
    </div>
  </ULandingSection>
  <ULandingSection>
    <div class="mt-[50px]">
      <div class="text-center max-w-[610px] m-auto relative">
        <UBadge class="text-pink-600 bg-pink-50"> Além das expectativas</UBadge>
        <h1 class="text-[32px] font-bold primary-color flex flex-wrap justify-center">
          <span>O que nossos clientes dizem</span>
        </h1>
      </div>
    </div>
  </ULandingSection>
  <ULandingSection>
    <div class="mt-[50px]">
      <div class="text-center max-w-[600px] m-auto relative">
        <UBadge class="text-pink-600 bg-pink-50"> Perguntas frequentes</UBadge>
        <h1 class="text-[32px] font-bold primary-color flex flex-wrap justify-center">
          <span class="highlight">
            Todas as informações sobre nossos serviços
            <NuxtImg
              class="absolute top-[22px] right-[-10px] hidden lg:flex"
              src="arrow.svg"
            />
          </span>
        </h1>
      </div>
    </div>
  </ULandingSection>
  <ULandingSection>
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
      </div>
    </div>
  </ULandingSection>
</template>

<style scoped>
.highlight {
  display: flex;
  position: relative;
  max-width: 1000px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
