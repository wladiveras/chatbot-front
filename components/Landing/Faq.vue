<script lang="ts" setup>
const items = [
  {
    label: "Este é um serviço seguro?",
    content:
      "Sim, a segurança dos seus dados é nossa prioridade. A Marina Bot utiliza criptografia de ponta a ponta para proteger suas conversas e informações pessoais. Além disso, somos totalmente compatíveis com as leis de proteção de dados, garantindo a privacidade e a segurança dos seus clientes.",

    defaultOpen: true,
  },
  {
    label: "Como posso cancelar minha assinatura?",
    content:
      "Cancelar sua assinatura na Marina Bot é simples e rápido. Basta acessar sua conta, ir para a seção de configurações e clicar em Cancelar Assinatura. Você pode cancelar a qualquer momento e não haverá cobranças após o período do plano atual.",
  },
  {
    label: "Como funciona o teste gratuito?",
    content:
      "Oferecemos um período de teste gratuito para que você possa experimentar todos os recursos da Marina Bot sem compromisso. Durante o período de teste, você terá acesso completo à plataforma e poderá criar suas primeiras automações. Ao final do período, você poderá escolher um dos nossos planos pagos ou cancelar sua assinatura sem nenhum custo adicional.",
  },
  {
    label: "Posso mudar de plano mais tarde?",
    content:
      "Sim, você pode mudar de plano a qualquer momento. Se precisar de mais recursos, basta acessar sua conta e escolher o plano que melhor atende às suas necessidades. A alteração do plano será aplicada a partir do próximo ciclo de cobrança.",
  },
  {
    label: "Vocês oferecem reembolsos?",
    content:
      "Oferecemos reembolso dentro dos primeiros 7 dias após a contratação do plano, caso você não esteja satisfeito com a ferramenta. Para solicitar o reembolso, entre em contato com nossa equipe de suporte.",
  },
]
</script>

<template>
  <ULandingSection>
    <div class="mt-[50px]">
      <div class="text-center max-w-[600px] m-auto relative">
        <UBadge class="text-blue-950 bg-gray-100"> Perguntas frequentes</UBadge>
        <h1 class="text-[32px] font-bold text-blue-950 flex flex-wrap justify-center">
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
