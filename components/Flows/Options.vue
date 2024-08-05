<script setup>
const flowsStore = useFlowsStore()
const { commands } = storeToRefs(flowsStore)

const options = [
  {
    label: "Texto",
    type: "text",
    icon: "material-symbols:font-download-outline",
    action: addCommand,
  },
  {
    label: "Imagem",
    type: "image",
    icon: "material-symbols:imagesmode-outline",
    action: addCommand,
  },
  {
    label: "Vídeo",
    type: "video",
    icon: "material-symbols:videocam-outline",
    action: addCommand,
  },
  {
    label: "Arquivo",
    type: "file",
    icon: "material-symbols:draft-outline",
    action: addCommand,
  },
  {
    label: "Audio",
    type: "audio",
    icon: "material-symbols:mic-outline",
    action: addCommand,
  },
  {
    label: "Variável",
    type: "Input",
    icon: "fluent:braces-variable-20-filled",
    action: addCommand,
  },
  {
    label: "Atraso",
    type: "delay",
    icon: "material-symbols:schedule-outline",
    action: addCommand,
  },
  {
    label: "Link",
    icon: "material-symbols:link",
    action: addCommand,
  },

  // {
  //   label: "Contato",
  //   type: "contact",
  //   icon: "material-symbols:id-card-outline",
  //   action: addCommand
  // },
]

function addCommand(command) {
  commands.value.push({
    ...command,
    value: "",
  })
}
</script>

<template>
  <section class="flex flex-col p-5 gap-20">
    <FlowsCommands editable v-if="commands.length" />

    <section class="grid grid-cols-3 gap-x-2 gap-y-5">
      <section
        v-for="(opt, index) in options"
        :key="index"
        class="flex flex-col gap-3 items-center border border-gray-300 border-dashed py-3 rounded-lg cursor-pointer hover:border-gray-600 hover:text-gray-600 transition-all ease-in-out"
        @click="opt.action(opt)"
      >
        <UIcon :name="opt?.icon" class="size-5" />
        <p class="text-xs text-gray-500">{{ opt.label }}</p>
      </section>
    </section>
  </section>
</template>
