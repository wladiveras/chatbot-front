<script setup>
const flowsStore = useFlowsStore()
const { currentCommands, commands } = storeToRefs(flowsStore)

const props = defineProps({
  editable: {
    type: Boolean,
    default: false,
    required: false,
  },
  nodeId: {
    type: Number,
    default: 0,
    required: false,
  },
})

const auxCommands = computed(() => {
  return !!props.nodeId
    ? commands.value.filter((command) => command.node_id === props.nodeId)
    : currentCommands.value
})
</script>

<template>
  <section class="flex flex-col gap-5" v-if="auxCommands.length">
    <UCard
      v-for="(command, index) in auxCommands"
      :key="index"
      :ui="{
        base: '',
        background: 'bg-gray-100',
        body: {
          base: 'flex flex-col gap-3',
          padding: editable ? 'p-5 sm:p-5' : 'p-2 sm:p-2',
        },
      }"
    >
      <section
        class="flex items-center gap-3"
        v-if="command.action == 'input' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <UIcon
            name="fluent:braces-variable-20-filled"
            class="size-5 relative top-[0.3rem]"
          />
          Criar variável
          <strong><span>{</span>{{ command.name }}<span>}</span> </strong>...
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.action == 'delay' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <UIcon
            name="material-symbols:schedule-outline"
            class="size-5 relative top-[0.3rem]"
          />
          Intervalo de <strong>{{ command.value }}</strong> segundos...
        </p>
      </section>

      <section
        class="flex flex-nowrap items-center gap-3"
        v-if="command.type == 'text' && !editable"
      >
        <p class="text-ellipsis overflow-hidden w-full">
          <UIcon
            name="material-symbols:font-download-outline"
            class="size-5 relative top-[0.3rem]"
          />
          {{ command.value }}
          <p class="text-ellipsis overflow-hidden w-full border-t-2 mt-3">
            <UIcon
              name="material-symbols:schedule-outline"
              class="size-5 relative top-[0.3rem]"
            />
            Digitando... <strong>{{ command.delay }} segundos</strong>
          </p>
        </p>

      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'video' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <video controls>
            <source :src="command.value" type="video/mp4" />
            <span>Seu navegador não é compatível.</span>
          </video>
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'image' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <NuxtImg :src="command.value" alt="Imagem" />
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'audio' && !editable"

      >
        <p class="text-ellipsis overflow-hidden">
          <audio controls>
            <source :src="command.value" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <p class="text-ellipsis overflow-hidden w-full border-t-2 mt-3">
            <UIcon
              name="material-symbols:schedule-outline"
              class="size-5 relative top-[0.3rem]"
            />
            Gravando... <strong>{{ command.delay }} segundos</strong>
          </p>
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'media_audio' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <audio controls>
            <source :src="command.value" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </p>
      </section>

      <section v-if="editable">
        <section class="gap-5 flex-1" v-if="command.type === 'text'">
          <UFormGroup label="Tempo digitando">
            <UInput v-model="command.delay" placeholder="1" />
          </UFormGroup>
          <br />
          <UFormGroup label="Mensagem">
            <UInput v-model="command.value" placeholder="Olá...." />
          </UFormGroup>
        </section>
        <section class="gap-5 flex-1" v-else-if="command.action === 'delay'">
          <UFormGroup label="Atraso">
            <UInput v-model="command.value" placeholder="1" />
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.action === 'input'">
          <UFormGroup label="Nome da variável">
            <UInput v-model="command.name" placeholder="exemplo: nome" />
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'audio'">
          <UFormGroup label="Tempo gravando">
            <UInput v-model="command.delay" placeholder="1" />
          </UFormGroup>
          <br />
          <UFormGroup label="Audio">
            <UInput v-model="command.value" placeholder="https://exemplo.com/audio.mp3" />
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'image'">
          <UFormGroup label="Imagem">
            <UInput v-model="command.value" placeholder="https://exemplo.com/image.jpg" />
          </UFormGroup>
          <br />
          <UFormGroup label="Descrição">
            <UInput v-model="command.caption" placeholder="Um descrição." />
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'video'">
          <UFormGroup label="Video">
            <UInput v-model="command.value" placeholder="https://exemplo.com/video.mp4" />
          </UFormGroup>
          <br />
          <UFormGroup label="Descrição">
            <UInput v-model="command.caption" placeholder="Um descrição." />
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'media_audio'">
          <UFormGroup label="Audio">
            <UInput v-model="command.value" placeholder="https://exemplo.com/audio.mp3" />
          </UFormGroup>
          <br />
          <UFormGroup label="Descrição">
            <UInput v-model="command.caption" placeholder="Um descrição." />
          </UFormGroup>
        </section>
      </section>
    </UCard>
  </section>
</template>
