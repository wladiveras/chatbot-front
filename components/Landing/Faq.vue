<script lang="ts" setup>
const items = [
  {
    label: "Este é um serviço seguro?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",

    defaultOpen: true,
  },
  {
    label: "Como posso cancelar minha assinatura?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Como funciona o teste gratuito?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Posso mudar de plano mais tarde?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
  {
    label: "Vocês oferecem reembolsos?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.",
  },
]
</script>

<template>
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
      <UAccordion color="primary" variant="ghost" size="sm" :items="items" />
    </div>
  </ULandingSection>
</template>

<style></style>
