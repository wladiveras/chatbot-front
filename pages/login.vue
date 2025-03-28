<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"

const runtimeConfig = useRuntimeConfig()
const title = ref(`${runtimeConfig.public.appName} - Entrar no sistema`)

onBeforeMount(() => {
  if (isAuthenticated.value) {
    navigateTo("/connections")
  }
})

definePageMeta({
  layout: "auth",
})

useSeoMeta({
  title: title.value,
})

const authStore = useAuthStore()
const { isAuthenticated, isLoadingSignIn } = storeToRefs(authStore)

const schema = z.object({
  email: z.string({ message: "Informe um email pra gente continuar." }).email({
    message: "Informe um email válido, pra que possamos te enviar o acesso ao sistema.",
  }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
})

const signInWithOAuth = async (provide: any) => {}

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  await authStore.signIn(state.email)
}
</script>

<template>
  <UCard class="max-w-[400px] w-full backdrop-blur login-container">
    <span class="highlight">
      <NuxtImg
        class="absolute h-14 top-[-70px] right-[-80px] hidden md:flex"
        src="/multi-lines.svg"
      />
    </span>
    <UForm
      :schema="schema"
      :state="state"
      :ui="{ base: 'text-center', footer: 'text-center' }"
      :submit-button="{ trailingIcon: 'i-heroicons-arrow-right-20-solid' }"
      class="space-y-4"
      @submit="handleLogin"
    >
      <div>
        <NuxtImg class="max-h-7 m-auto mb-10 mt-6" src="/Logo.png" />
        <h1 class="text-xl font-bold text-center text-blue-950">Seja bem vindo(a) 👋</h1>
        <p class="text-sm font-light text-gray-500 py-2 mb-4 text-center">
          Por favor, insira seus dados para fazer login.
        </p>
        <div class="text-center w-full flex justify-center mb-1">
          <UButton
            @click="signInWithOAuth('apple')"
            class="text-center px-10 mx-1 py-3 flex text-gray-200"
            :ui="{ rounded: 'rounded-md' }"
            variant="outline"
          >
            <UIcon name="uim:apple" size="20px" class="text-black" />
          </UButton>
          <UButton
            @click="signInWithOAuth('google')"
            class="text-center px-10 mx-1 py-3 flex text-gray-200"
            :ui="{ rounded: 'rounded-md' }"
            variant="outline"
          >
            <UIcon name="uim:google" size="20px" class="text-yellow-600" />
          </UButton>
          <UButton
            @click="signInWithOAuth('facebook')"
            class="text-center px-10 mx-1 py-3 flex text-gray-200"
            :ui="{ rounded: 'rounded-md' }"
            variant="outline"
          >
            <UIcon name="uim:facebook" size="20px" class="text-blue-500" />
          </UButton>
        </div>
        <UDivider
          label="OU"
          class="py-1 mt-5 text-gray-100"
          :ui="{ label: 'text-gray-300 font-light' }"
        />
      </div>

      <div>
        <UFormGroup name="email">
          <span class="text-gray-500 font-semibold text-sm mb-3 block">
            Endereço de e-mail
          </span>

          <UInput
            size="lg"
            class="block mb-7"
            v-model="state.email"
            placeholder="informe seu e-mail"
            variant="outline"
          />
        </UFormGroup>
      </div>

      <UButton
        type="submit"
        class="w-full flex text-center py-[15px] px-[25px] bg-blue-950"
        :loading="isLoadingSignIn"
        block
      >
        Continuar
      </UButton>
      <p class="text-gray-400 font-normal text-xs text-center">
        Ao continuar, você confirma que entende e concorda com os
        <span class="font-semibold cursor-pointer">Termos e Condições</span> e com a
        <span class="font-semibold cursor-pointer">Política de Privacidade.</span>
      </p>
    </UForm>
  </UCard>
</template>
