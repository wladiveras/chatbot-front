<script lang="ts" setup>
const page = reactive({
  items: [
    {
      quote:
        "Desde que comecei a usar o Marina Bot, a diferença foi imediata. A interface fácil de usar me permitiu configurar automações rapidamente, sem complicações. A confiabilidade da ferramenta é notável; nossas mensagens chegam sempre no momento certo.",
      author: {
        name: "@maria.souza",
        description: "Consultora de Vendas",
        avatar: {
          src: "https://i.pravatar.cc/120?img=1",
        },
      },
    },
    {
      quote:
        "Marina Bot transformou a forma como gerencio minhas interações com clientes. A ferramenta é rápida e eficiente, permitindo que eu automatize respostas e acompanhe leads sem perder tempo. A escalabilidade é perfeita para ajustar o volume de mensagens conforme aumento na demanda.",
      author: {
        name: "@roberta",
        description: "Gerente de Suporte ao Cliente",
        avatar: {
          src: "https://i.pravatar.cc/120?img=7",
        },
      },
    },
    {
      quote:
        "A Marina Bot foi uma decisão acertada para nossa equipe de suporte. A confiabilidade da plataforma garante que todas as nossas mensagens sejam entregues sem falhas, e a segurança dos dados é uma grande vantagem. A velocidade com que a ferramenta processa as automações tornou nosso atendimento mais eficiente, e a interface intuitiva facilita o treinamento da equipe.",
      author: {
        name: "@rodrigo",
        description: "Proprietário de E-commerce",
        avatar: {
          src: "https://i.pravatar.cc/120?img=3",
        },
      },
    },
  ],
})
</script>
<template>
  <ULandingSection id="testimonials">
    <div class="mt-[50px]">
      <div class="text-center max-w-[610px] m-auto relative">
        <UBadge class="text-blue-950 bg-blue-50"> Além das expectativas</UBadge>
        <h1 class="text-[32px] font-bold text-blue-950 flex flex-wrap justify-center">
          <span>O que nossos clientes dizem</span>
        </h1>
      </div>

      <UPageColumns class="mt-10">
        <div
          v-for="(testimonial, index) in page.items"
          :key="index"
          class="break-inside-avoid"
        >
          <ULandingTestimonial
            :ui="{
              body: {
                base: 'flex flex-col ',
                padding: '4',
              },
              wrapper: 'relative',
              quote: 'text-gray-400',
              icon: {
                wrapper: 'mb-6 flex',
                base: 'w-8 h-8 flex-shrink-0 text-gray-500',
              },
              author: {
                wrapper: 'flex items-center gap-3 mt-6 relative',
                name: 'font-semibold text-blue-950 text-sm',
                description: 'text-gray-500 text-sm',
                avatar: {
                  base: '',
                  size: 'md',
                },
              },
            }"
            v-bind="testimonial"
          />
        </div>
      </UPageColumns>
    </div>
  </ULandingSection>
</template>

<style></style>
