<script lang="ts" setup></script>

<template>
  <div class="background-header" />
  <UContainer>
    <UPage>
      <AppHeader />
      <slot />
      <AppFooter />
    </UPage>
  </UContainer>
</template>

<style scoped>
.background-header {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url("/header-background.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top center;
}
</style>
