<script setup lang="ts">
const modal = useModal()

const closeModal = () => {
  modal.close()
}

const handleNavigationToNew = (path: string) => {
  modal.close()
  return navigateTo(`${path}`)
}
</script>
<template>
  <UModal prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Qual tipo de Automação deseja criar?
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="closeModal"
          />
        </div>
      </template>

      <section class="flex content-center gap-5">
        <section class="flex-1">
          <UButton
            block
            label="Automação com IA"
            @click="handleNavigationToNew('/flows/automation/new')"
          />
          <small class="ml-2 mt-2 block">
            Crie uma automação de conversa com inteligência artificial para atender seus
            clientes.
          </small>
        </section>
        <section class="flex-1">
          <UButton
            block
            label="Automação com fluxos"
            @click="handleNavigationToNew('/flows/new')"
          />
          <small class="ml-2 mt-2 block">
            Crie um fluxo de conversa para automatizar o atendimento e a comunicação com
            seus clientes.
          </small>
        </section>
      </section>
    </UCard>
  </UModal>
</template>
