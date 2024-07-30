<script setup lang="ts">
const route = useRoute()
const user = useCookie("user", {
  sameSite: "none",
})
const xsrfToken = useCookie("XSRF-TOKEN", {
  sameSite: "none",
})
const makeRequests = useMakeRequests()

makeRequests.get("/csrf-cookie").then((response) => {
  if (response.ok) {
    console.log({ test: response.data })
    xsrfToken.value = response.data?.xsrfToken
  }
})

const request = makeRequests
  .post(`/auth/magic-link/${route.params.code}`)
  .then((response) => {
    if (response.ok) {
    }
    throw new Error("Erro ao tentar autenticar.")
  })

console.log({
  request,
})

user.value = user.value || null

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/plans")
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>Aguardando conexão...</div>
</template>
