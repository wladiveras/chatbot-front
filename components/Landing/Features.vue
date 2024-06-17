<script setup lang="ts">
const features = reactive([
  {
    title: "Fácil de usar",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    icon: "solar:star-outline",
  },
  {
    title: "Confiável",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    icon: "carbon:security",
  },
  {
    title: "Seguro",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    icon: "ic:outline-lock",
  },
  {
    title: "Rápido",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    icon: "akar-icons:thunder",
  },
  {
    title: "Custo-benefício",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    icon: "f7:money-dollar-circle",
  },
  {
    title: "Escalável",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when",
    icon: "mdi:finance",
  },
])
</script>
<template>
  <ULandingSection id="features">
    <div>
      <div class="text-center lg:text-left max-w-[610px] relative">
        <span class="font-semibold primary-pink">■ Recursos</span>
        <h1
          class="text-[32px] font-bold primary-color flex flex-wrap justify-center lg:justify-left"
        >
          Descubra como a MarinaBot pode impulsionar suas vendas!
        </h1>
      </div>

      <div class="relative">
        <NuxtImg src="/multi-lines.svg" class="absolute top-[-60px] right-[-60px]" />
        <ULandingGrid class="mt-20">
          <ULandingCard
            class="col-span-6 row-span-2 bg-pink-50"
            v-for="feature in features"
            :key="feature.title"
          >
            <template #title>
              <div class="flex items-center text-pink-600">
                <UIcon :name="feature.icon" size="22px" class="mr-5" />
                <span class="font-semibold"> {{ feature.title }} </span>
              </div>
            </template>
            <template #description>
              <p class="text-[#9A7587] mt-5 text-sm">
                {{ feature.description }}
              </p>
            </template>
          </ULandingCard>
        </ULandingGrid>
        <NuxtImg src="/multi-lines-2.png" class="relative top-[-5px] left-[-55px]" />
      </div>
    </div>
  </ULandingSection>
</template>
<style></style>
