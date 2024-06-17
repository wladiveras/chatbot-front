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
const toast = useToast()
const loading = ref(false)

const schema = z.object({
  email: z.string().email("Informe um email válido."),
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
})

const signInWithOAuth = async (provide: any) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provide,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })
  if (error) {
    toast.add({
      title: "Atenção!",
      description: error.message,
      icon: "material-symbols:error-outline",
    })
  }
}

const handleLogin = async (event: FormSubmitEvent<Schema>) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: state.email })

    if (error) throw error

    toast.add({
      title: "Atenção!",
      description:
        "Verifique seu email, foi enviado um link mágico para acessar o sistema.",
      icon: "i-heroicons-check-badge",
    })
  } catch (error) {
    toast.add({
      title: "Atenção!",
      description: error.error_description || error.message,
      icon: "material-symbols:error-outline",
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard
    class="max-w-[400px] w-full bg-white/75 dark:bg-white/5 backdrop-blur login-container"
  >
    <span class="highlight">
      <NuxtImg
        class="absolute top-[-80px] right-[-90px] hidden md:flex"
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
      <div class="">
        <NuxtImg class="max-h-7 m-auto mb-10 mt-6" src="/Logo.png" />
        <h1 class="text-xl font-bold text-center primary-color">Seja bem vindo(a) 👋</h1>
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
            @click="signInWithOAuth('twitter')"
            class="text-center px-10 mx-1 py-3 flex text-gray-200"
            :ui="{ rounded: 'rounded-md' }"
            variant="outline"
          >
            <UIcon name="uim:twitter" size="20px" class="text-blue-500" />
          </UButton>
        </div>
        <UDivider
          label="OU"
          class="py-1 mt-5 text-gray-100"
          :ui="{ label: 'text-gray-300 font-light' }"
        />
      </div>

      <div>
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
      </div>

      <UButton
        @click="handleLogin"
        type="button"
        class="w-full flex text-center py-[15px] px-[25px] primary-bg"
        :loading="loading"
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
    <span class="highlight">
      <NuxtImg class="absolute top-[70px] right-[70px] hidden md:flex" src="/line.svg" />
    </span>
  </UCard>
</template>

<style scoped>
.login-container {
  border-radius: 10px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 1) 80%,
    rgba(236, 72, 153, 0.2) 100%
  );
  background-origin: content-box;
}
</style>
