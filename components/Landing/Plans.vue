<script lang="ts" setup></script>

<template>
  <ULandingSection id="pricing">
    <div class="mt-[50px]">
      <div class="text-center m-auto relative">
        <span class="font-semibold text-blue-950">Planos e preços</span>
        <h1 class="text-[32px] font-bold text-blue-950 flex flex-wrap justify-center">
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
        <p class="text-[16px] text-gray-500 border-gray-10 mt-7 font-light">
          Preços simples, sem taxas ocultas, recursos avançados para sua empresa
        </p>
        <div class="mt-16">
          <UPricingGrid>
            <UPricingCard
              price="147,00"
              discount="00,00"
              cycle="/mês"
              :badge="{ label: 'Grátis' }"
              :button="{
                label: 'Contratar Plano',
                color: 'gray',
                to: '/login',
              }"
              orientation="vertical"
              align="bottom"
              :features="[
                '1 Conexão de WhatsApp',
                '30 dias gratis',
                '100 leads de Limite',
                'Fluxo Marina Bot',
                'Dashboard exclusiva',
                'Suporte por WhatsApp',
              ]"
            />
            <UPricingCard
              price="297,00"
              cycle="/mês"
              highlight
              :badge="{ label: 'Premium' }"
              :button="{ label: 'Contratar Plano', to: '/login' }"
              orientation="vertical"
              align="bottom"
              :features="[
                '5 Conexão de WhatsApp',
                'Leads ilimitados',
                'Fluxo Marina Bot',
                'Dashboard exclusiva',
                'Suporte por WhatsApp',
              ]"
            />
            <UPricingCard
              price="Personalizado"
              :badge="{ label: 'Enterprise' }"
              :button="{
                label: 'Entrar em Contato',
                color: 'gray',
                to: '/login',
              }"
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
