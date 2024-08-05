<template>
  <div class="rete" ref="rete"></div>
</template>

<script setup>
const rete = ref(null)

onMounted(() => {
  if (rete.value) {
    createEditor(rete.value)
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
}
.rete {
  width: 100vw;
  height: 100vh;
}
</style>
