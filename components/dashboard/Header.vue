<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast.add({
      title: "Atenção!",
      description: error.message,
      icon: "material-symbols:error-outline",
    })
  } else {
    toast.add({
      title: "Atenção!",
      description: "Desconectado da sua sessão com sucesso.",
      icon: "i-heroicons-check-badge",
    })
  }
}
</script>

<template>
  <UHeader class="py-5 border-0 bg-gray-50/0">
    <template #logo>
      <NuxtImg src="/Logo.png" class="h-[30px] w-full" />
    </template>

    <template #right>
      <UButton
        icon="octicon:fire-24"
        :label="user.user_metadata.name"
        class="hidden lg:flex font-normal bg-pink-100 text-pink-500 animate__animated animate__rubberBand"
      />
      <UButton
        trailing-icon="ri:logout-circle-line"
        @click="signOut"
        class="hidden lg:flex font-semibold bg-gray-200 text-gray-500 animate__animated animate__rubberBand"
      />
    </template>

    <template #panel>
      <UDivider class="my-6" />
      <UButton label="Sair" block />
    </template>
  </UHeader>
</template>
<style scoped></style>
