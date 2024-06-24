<script lang="ts" setup></script>

<template>
  <ULandingSection id="pricing">
    <div class="mt-[50px]">
      <div class="text-center m-auto relative">
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
        <div class="mt-16">
          <UPricingGrid>
            <UPricingCard
              price="147,00"
              discount="00,00"
              cycle="/mês"
              :badge="{ label: 'Grátis' }"
              :button="{ label: 'Contratar Plano', color: 'pink' }"
              orientation="vertical"
              align="bottom"
              :features="[
                '30 dias gratis',
                '1 Conexão de WhatsApp',
                '100 leads de Limite',
                'Fluxo Marina Bot',
                'Dashboard exclusiva',
                'Suporte por WhatsApp',
              ]"
            />
            <UPricingCard
              price="147,00"
              cycle="/mês"
              highlight
              :badge="{ label: 'Premium' }"
              :button="{ label: 'Contratar Plano', color: 'pink' }"
              orientation="vertical"
              align="bottom"
              :features="[
                '1 Conexão de WhatsApp',
                '100 leads de Limite',
                'Fluxo Marina Bot',
                'Dashboard exclusiva',
                'Suporte por WhatsApp',
              ]"
            />
            <UPricingCard
              price="Personalizado"
              :badge="{ label: 'Enterprise' }"
              :button="{ label: 'Entrar em Contato', color: 'pink' }"
              orientation="vertical"
              align="bottom"
              :features="['Todos os recursos', 'White Label', 'Suporte Exclusivo']"
            />
          </UPricingGrid>
        </div>
      </div>
    </div>
  </ULandingSection>
</template>

<style></style>
