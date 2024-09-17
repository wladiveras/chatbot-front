<script setup>
import { useVueFlow } from "@vue-flow/core"

const flowsStore = useFlowsStore()
const { selectedNode } = storeToRefs(flowsStore)
const { updateNodeData } = useVueFlow()

const options = [
  {
    label: "Texto",
    description: "Enviei uma mensagem de texto ao cliente.",
    type: "text",
    action: "message",
    delay: 1,
    icon: "material-symbols:font-download-outline",
    callback: addCommand,
  },
  {
    label: "Audio",
    description: "Envie uma mensagem de voz ao cliente.",
    type: "audio",
    action: "message",
    delay: 1,
    icon: "material-symbols:mic-outline",
    callback: addCommand,
  },
  {
    label: "Variável",
    description: "Pausa o automação até o cliente responder.",
    type: "Input",
    action: "input",
    icon: "fluent:braces-variable-20-filled",
    callback: addCommand,
  },
  {
    label: "Imagem",
    description: "Envie uma mídia de imagem.",
    type: "image",
    action: "message",
    caption: "",
    icon: "material-symbols:imagesmode-outline",
    callback: addCommand,
  },
  {
    label: "Vídeo",
    description: "Envie uma mídia de video.",
    type: "video",
    action: "message",
    icon: "material-symbols:videocam-outline",
    callback: addCommand,
  },
  {
    label: "Media",
    description: "Envie uma mídia de audio.",
    type: "media_audio",
    action: "message",
    caption: "",
    icon: "material-symbols:draft-outline",
    callback: addCommand,
  },

  {
    label: "Atraso",
    description: "Adicione um intervalo entre as mensagens.",
    type: "delay",
    action: "delay",
    icon: "material-symbols:schedule-outline",
    callback: addCommand,
  },
  {
    label: "Link",
    description: "Adicione um link para redirecionar o cliente.",
    type: "link",
    action: "message",
    icon: "material-symbols:link",
    callback: addCommand,
  },
]

function addCommand(command) {
  const commands = selectedNode.value.data.commands

  const newCommand = {
    ...command,
  }

  if (command.action === "delay") {
    newCommand.value = 1
  }

  commands.push(newCommand)

  updateNodeData(selectedNode.value.id, { commands })
}
</script>

<template>
  <section class="flex flex-col p-5 gap-20">
    <FlowsCommands editable :id="selectedNode.id" :data="selectedNode.data.commands" />

    <section class="grid grid-cols-3 gap-x-2 gap-y-5">
      <section v-for="(opt, index) in options" :key="index" @click="opt.callback(opt)">
        <UTooltip
          class="flex flex-col gap-3 items-center border border-gray-300 border-dashed py-3 rounded-lg cursor-pointer hover:border-gray-600 hover:text-gray-600 transition-all ease-in-out"
        >
          <template #text>
            <span class="bold">{{ opt?.description }}</span>
          </template>
          <UIcon :name="opt?.icon" class="size-5" />
          <p class="text-xs text-gray-500">{{ opt.label }}</p>
        </UTooltip>
      </section>
    </section>
  </section>
</template>
