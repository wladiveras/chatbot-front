<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

definePageMeta({
  layout: "auth",
})

useSeoMeta({
  title: "Marina Bot - Entrar no sistema",
})

const supabase = useSupabaseClient()
const loading = ref(false)

const schema = z.object({
  email: z.string().email("Informe um email válido."),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
})

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: state.email })

    if (error) throw error

    alert("Check your email for the login link!")
  } catch (error) {
    alert(error.error_description || error.message)
    console.log(event.data)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
    <UForm
      :schema="schema"
      :state="state"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      class="space-y-4"
      @submit="handleLogin"
    >
      <div>
        <NuxtImg class="max-h-7 m-auto mb-10" src="/Logo.png" />
        <h1 class="text-xl font-bold text-center">Seja bem vindo(a) 👋</h1>
        <p class="text-sm font-light text-gray-300 py-2 mb-4">
          Por favor, insira seus dados para fazer login.
        </p>
        <div class="text-center w-full flex justify-center">
          <UButton
            class="text-center px-7 mx-1 py-3 flex"
            color="green"
            icon="i-simple-icons-github"
          />
          <UButton
            class="text-center px-7 mx-1 py-3 flex"
            color="green"
            icon="i-simple-icons-github"
          />
          <UButton
            class="text-center px-7 mx-1 py-3 flex"
            color="green"
            icon="i-simple-icons-github"
          />
        </div>
        <UDivider label="OU" class="py-5" />
      </div>

      <UFormGroup label="Endereço de email" name="email">
        <UInput v-model="state.email" placeholder="informe seu email" />
      </UFormGroup>
      <UButton
        type="submit"
        class="w-full flex text-center py-4"
        :loading="loading"
        block
      >
        Continuar
      </UButton>
      <p>
        Ao continuar, você confirma que entende e concorda com os Termos e Condições e com
        a Política de Privacidade.
      </p>
    </UForm>
  </UCard>
</template>

<style scoped></style>
