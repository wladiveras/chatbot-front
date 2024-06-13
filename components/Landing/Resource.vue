<script setup lang="ts"></script>
<template>
  <ULandingSection>
    <div>
      <div class="text-center lg:text-left max-w-[610px] relative">
        <span class="font-semibold primary-pink">■ Recursos</span>
        <h1
          class="text-[32px] font-bold primary-color flex flex-wrap justify-center lg:justify-left"
        >
          Descubra como a MarinaBot pode impulsionar suas vendas!
        </h1>
      </div>
      <ULandingGrid class="mt-20">
        <ULandingCard class="col-span-6 row-span-2 bg-pink-50">
          <template #title>
            <div class="flex items-center text-pink-600">
              <UIcon name="solar:star-outline" size="22px" class="mr-5" />
              <span class="font-semibold"> Fácil de usar </span>
            </div>
          </template>
          <template #description>
            <p class="text-[#9A7587] mt-5 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when
            </p>
          </template>
        </ULandingCard>
      </ULandingGrid>
    </div>
  </ULandingSection>
</template>
<style></style>
