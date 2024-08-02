<script setup>
const options = [
  {
    label: "Texto",
    icon: "material-symbols:font-download-outline",
    action: () => {}
  },
  {
    label: "Imagem",
    icon: "material-symbols:imagesmode-outline",
    action: () => {}
  },
  {
    label: "Vídeo",
    icon: "material-symbols:videocam-outline",
    action: () => {}
  },
  {
    label: "Arquivo",
    icon: "material-symbols:draft-outline",
    action: () => {}
  },
  {
    label: "Audio",
    icon: "material-symbols:mic-outline",
    action: () => {}
  },
  {
    label: "Atraso",
    icon: "material-symbols:schedule-outline",
    action: () => {}
  },
  {
    label: "Auto Off",
    icon: "material-symbols:power-settings-new",
    action: () => {}
  },
  {
    label: "Contato",
    icon: "material-symbols:id-card-outline",
    action: () => {}
  },
  {
    label: "Link",
    icon: "material-symbols:link",
    action: () => {}
  },
]
</script>

<template>
  <section class="flex flex-col p-5">
    <section class="grid grid-cols-3 gap-x-2 gap-y-5">
      <section
        v-for="(opt, index) in options"
        :key="index"
        class="flex flex-col gap-3 items-center border border-gray-300 border-dashed py-3 rounded-lg cursor-pointer hover:border-gray-600 hover:text-gray-600 transition-all ease-in-out"
      >
        <UIcon 
          :name="opt?.icon"
          class="size-5"
        />
        <p class="text-xs text-gray-500">{{ opt.label }}</p>
      </section>
    </section>
  </section>
</template>
