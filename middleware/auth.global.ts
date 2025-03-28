export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  authStore.init();

  const { isAuthenticated } = storeToRefs(authStore);
  
  if (!isAuthenticated.value && to.meta.layout === "dashboard") {
    return navigateTo('/login')
  }
})