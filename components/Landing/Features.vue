<script setup lang="ts">
const features = reactive([
  {
    title: "Fácil de usar",
    description:
      "Marina Bot possui uma interface intuitiva, permitindo que você configure automações rapidamente sem a necessidade de conhecimentos técnicos. Crie automações de mensagens com poucos cliques e comece a automatizar seu atendimento em minutos.",
    icon: "solar:star-outline",
  },
  {
    title: "Confiável",
    description:
      "Com uma infraestrutura robusta, Marina Bot garante alta disponibilidade e desempenho estável. Nossa plataforma é projetada para garantir que suas mensagens sejam entregues com precisão e no tempo certo, minimizando falhas e interrupções.",
    icon: "carbon:security",
  },
  {
    title: "Seguro",
    description:
      "A segurança é uma prioridade, com proteção de dados através de criptografia de ponta a ponta. Marina Bot cumpre com as melhores práticas de segurança para proteger as informações dos seus clientes e manter a integridade dos dados.",
    icon: "ic:outline-lock",
  },
  {
    title: "Rápido",
    description:
      "Automatize suas respostas e comunicações com eficiência. Marina Bot processa e envia mensagens em alta velocidade, permitindo interações instantâneas com seus clientes e melhorando a agilidade no atendimento.",
    icon: "akar-icons:thunder",
  },
  {
    title: "Custo-benefício",
    description:
      "Oferece planos acessíveis que atendem a diferentes necessidades e tamanhos de empresas. Marina Bot proporciona uma solução econômica com recursos avançados, maximizando o retorno sobre o investimento.",
    icon: "f7:money-dollar-circle",
  },
  {
    title: "Escalável",
    description:
      "A ferramenta cresce junto com o seu negócio. Adapte e expanda suas automações conforme necessário, com flexibilidade para atender a um volume crescente de interações e novos desafios.",
    icon: "mdi:finance",
  },
])
</script>
<template>
  <ULandingSection id="features">
    <div>
      <div class="text-center flex flex-col gap-5 lg:text-left max-w-[610px] relative">
        <span class="font-semibold text-blue-950"
          >■ <span class="ml-5">Recursos</span></span
        >
        <h1
          class="text-[32px] font-bold text-blue-950 flex flex-wrap justify-center lg:justify-left"
        >
          Descubra como a MarinaBot pode impulsionar suas vendas!
        </h1>
      </div>

      <div class="relative">
        <NuxtImg
          src="/multi-lines.svg"
          height="55px"
          class="absolute top-[-50px] right-[-60px]"
        />
        <ULandingGrid class="mt-20">
          <ULandingCard
            class="col-span-6 row-span-2 bg-gray-100"
            v-for="feature in features"
            :key="feature.title"
          >
            <template #title>
              <div class="flex items-center text-blue-950">
                <UIcon :name="feature.icon" size="22px" class="mr-5" />
                <span class="font-semibold"> {{ feature.title }} </span>
              </div>
            </template>
            <template #description>
              <p class="text-gray-500 mt-5 text-sm">
                {{ feature.description }}
              </p>
            </template>
          </ULandingCard>
        </ULandingGrid>
        <NuxtImg
          src="/multi-lines.svg"
          height="55px"
          class="relative rotate-180 top-[-10px] left-[-60px]"
        />
      </div>
    </div>
  </ULandingSection>
</template>
<style></style>
