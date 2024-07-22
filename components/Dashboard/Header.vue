<script setup lang="ts">
const headerStore = useHeaderStore();
</script>

<template>
  <header class="flex items-center justify-between max-h-24 border-b border-solid border-[#E5E5E5] px-8 py-6">
    <NuxtImg src="/Logo.png" class="w-32" />
    <slot>
      <section class="flex items-center gap-5">
        <UBadge
          class="gap-3 text-sm font-semibold px-4 py-2 bg-[#46C78B1A] text-[#46C78B]"
          :ui="{ rounded: 'rounded-full' }"
        >
          <UIcon class="text-2xl" name="material-symbols:person-outline" />
          17 de 50 leads utilizados
        </UBadge>
        <UAvatar 
          src="https://s3-alpha-sig.figma.com/img/98eb/f923/1260a25af820f4d744b441a0b54bcc24?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H7qRofSBhLbbSy4NAd-LEC11ifYD-hX6b~9r7lu5QK93cDq-qMV2CY9-gO15SLqFQehoBZQbOG7xgStd1tsrUHBaG84~Z30wd9gVV3CvMBFVQj2D5o4MJfVolaoxaV5nbUHTTHiy2qXPTwY~Tay2qfMzeWmjb0JURbNzM5YvYXiPGkElZFvz9kzJrzohXBUlh7h80GWcWM1OomzziVI~fIVySCsLF1~cshNPUDJqbJbosEnAUgIh--PYeJjTQxQXBDp~AIKnKBkI3rHGGFBmB66dmwns0Ln8h949g-1r17rH~2ciwKlG~C2R2SbJtII3PsMajmzXg3sSLCEwXKrtDA__"
          size="lg"
        />
      </section>
    </slot>
  </header>
</template>
