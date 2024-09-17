<script setup>
const runtimeConfig = useRuntimeConfig()
const title = ref(`${runtimeConfig.public.appName} - Planos de assinatura `)

const cards = [
  {
    price: "R$ 29",
    cycle: "/ano",
    highlight: false,
    badge: { label: "Starter" },
    button: { label: "Contratar plano" },
    orientation: "vertical",
    align: "bottom",
    features: ["Um projeto", "Seu dashboard"],
  },
  {
    price: "R$ 29",
    cycle: "/ano",
    highlight: true,
    badge: { label: "Basic" },
    button: { label: "Contratar plano" },
    orientation: "vertical",
    align: "bottom",
    features: [
      "Dois projetos",
      "Seu dashboard",
      "Componentes incluídos",
      "Gráficos avançados",
    ],
  },
  {
    price: "R$ 59",
    cycle: "/ano",
    highlight: false,
    badge: { label: "Premium" },
    button: { label: "Contratar plano" },
    orientation: "vertical",
    align: "bottom",
    features: [
      "Projetos ilimitados",
      "Seu dashboard",
      "Componentes ilimitados",
      "Gráficos avançados",
      "Suporte por chat",
    ],
  },
]
const isYearly = ref(false)

definePageMeta({
  layout: "dashboard",
})

useSeoMeta({
  title: title.value,
})
</script>

<template>
  <main class="flex flex-col gap-10">
    <CustomHeader
      title="Planos e preços"
      description="Preços simples, sem taxas ocultas, recursos avançados para sua empresa"
      custom-class="text-center !justify-center"
    />
    <UPricingToggle v-model="isYearly" class="max-w-xs self-center" />
    <UPricingGrid :compact="false">
      <UPricingCard
        v-for="(item, index) in cards"
        :key="index"
        :price="item.price"
        :cycle="item.cycle"
        :badge="item.badge"
        :align="item.align"
        :button="item.button"
        :features="item.features"
        :highlight="item.highlight"
        :orientation="item.orientation"
        :ui="{
          amount: {
            base:
              'flex flex-row items-baseline gap-x-1 border-b border-b-solid border-b-gray-100 pb-8',
          },
        }"
      />
    </UPricingGrid>
  </main>
</template>
