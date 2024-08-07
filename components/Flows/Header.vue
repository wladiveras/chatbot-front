<script setup lang="ts">
const flowsStore = useFlowsStore()
const { flow, flowName, flowDescription, isCreation } = storeToRefs(flowsStore)

const isOpen = ref(false)

async function saveFlow() {
  if (isCreation.value) {
    await flowsStore.createFlow()
    .then(() => {
      navigateTo(`/flows`);
    });
    return
  }
  await flowsStore.updateFlow()
  .then(() => {
    navigateTo(`/flows`);
  });
}

async function handleClick() {
  await flowsStore.createCommands();
  saveFlow();
}
</script>

<template>
  <header
    class="flex items-center justify-between h-full max-h-24 border-b border-solid border-[#E5E5E5] px-8 py-6 gap-10"
  >
    <section class="w-full max-w-56 border-r border-[#E5E5E5]">
      <NuxtImg
        src="/Logo.png"
        class="w-32 cursor-pointer"
        @click="navigateTo('/flows')"
      />
    </section>

    <CustomHeader
      :title="flowName"
      :description="flowDescription"
      title-class="font-bold text-base"
      description-class="font-normal text-xs"
      editable
    >
      <template #actions>
        <section class="flex items-center gap-5">
          <UButton
            icon="mdi:tag-edit"
            label="Editar nome e descrição"
            class="bg-gray-100 text-blue-950"
            @click="isOpen = true"
          />
          <UButton
            icon="streamline:interface-content-fire-lit-flame-torch-trending"
            :label="isCreation ? 'Criar Fluxo' : 'Salvar fluxo'"
            @click="handleClick"
          />
        </section>
      </template>
    </CustomHeader>

    <UModal v-model="isOpen" :transition="false">
      <UForm :state="flow" class="space-y-4 gap-5 p-10">
        <UFormGroup label="Nome do fluxo" name="flow" eager-validation>
          <UInput v-model="flow.name" placeholder="" />
        </UFormGroup>
        <UFormGroup label="Descrição do fluxo" name="description" eager-validation>
          <UInput v-model="flow.description" placeholder="" />
        </UFormGroup>

        <UButton class="bg-blue-950 text-white" @click="isOpen = false" block>
          Fechar
        </UButton>
      </UForm>
    </UModal>
  </header>
</template>
