<script setup>
const flowsStore = useFlowsStore()
const { commands, selectedNode } = storeToRefs(flowsStore)

const options = [
  {
    label: "Texto",
    type: "text",
    action: "message",
    delay: 1,
    icon: "material-symbols:font-download-outline",
    callback: addCommand,
  },
  {
    label: "Imagem",
    type: "image",
    action: "message",
    caption: "",
    icon: "material-symbols:imagesmode-outline",
    callback: addCommand,
  },
  {
    label: "Vídeo",
    type: "video",
    action: "message",
    icon: "material-symbols:videocam-outline",
    callback: addCommand,
  },
  {
    label: "Arquivo",
    type: "file",
    action: "message",
    icon: "material-symbols:draft-outline",
    callback: addCommand,
  },
  {
    label: "Audio",
    type: "audio",
    action: "message",
    icon: "material-symbols:mic-outline",
    callback: addCommand,
  },
  {
    label: "Variável",
    type: "Input",
    action: "message",
    icon: "fluent:braces-variable-20-filled",
    callback: addCommand,
  },
  {
    label: "Atraso",
    type: "delay",
    action: "message",
    icon: "material-symbols:schedule-outline",
    callback: addCommand,
  },
  {
    label: "Link",
    type: "text",
    action: "message",
    icon: "material-symbols:link",
    callback: addCommand,
  },

  // {
  //   label: "Contato",
  //   type: "contact",
  //   icon: "material-symbols:id-card-outline",
  //   action: addCommand
  // },
]

function addCommand(command) {
  selectedNode.value.data.commands.push({
    ...command,
    value: "",
  })
}
</script>

<template>
  <section class="flex flex-col p-5 gap-20">
    <FlowsCommands editable :node="selectedNode" />

    <section class="grid grid-cols-3 gap-x-2 gap-y-5">
      <section
        v-for="(opt, index) in options"
        :key="index"
        class="flex flex-col gap-3 items-center border border-gray-300 border-dashed py-3 rounded-lg cursor-pointer hover:border-gray-600 hover:text-gray-600 transition-all ease-in-out"
        @click="opt.callback(opt)"
      >
        <UIcon :name="opt?.icon" class="size-5" />
        <p class="text-xs text-gray-500">{{ opt.label }}</p>
      </section>
    </section>
  </section>
</template>
