<script setup lang="ts">
import { useVueFlow } from '@vue-flow/core';

const props = defineProps({
  editable: {
    type: Boolean,
    default: false,
    required: false,
  },
  id: {
    type: String,
    required: true,
    default: () => {},
  },
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const { updateNodeData } = useVueFlow()
const upload = useUpload('/api/blob', { method: 'PUT', multiple: false })

// @ts-ignore
const commands = ref([...props?.data]);

const handleNodeChange = () => {
  // @ts-ignore
  commands.value = props?.data;
}

const handleChange = () => {
  if (props.editable) {
    updateNodeData(props.id, { commands: commands.value });
  }
}

const removeCommand = (deleted) => {
  commands.value = commands.value.filter(
    (command) => command !== deleted
  )
}

const handleChangeFile = async (payload) => {
  const { command, event, index } = payload;
  const { target } = event;
  const auxCommand = { ...command };

  if (!event) return;

  const uploadedFile = await upload(target);

  if (uploadedFile) {
    auxCommand.value = uploadedFile.pathname;
    auxCommand.ContentType = uploadedFile.contentType;
    commands.value[index] = auxCommand;
  }
}

watch(
  () => props?.data,
  handleNodeChange,
  { deep: true }
)

watch(
  () => commands,
  handleChange,
  { deep: true }
)

</script>

<template>
  <section class="flex flex-col gap-5" v-if="commands.length">

    <UCard
      v-for="(command, index) in commands"
      :key="index"
      :ui="{
        base: '',
        background: editable? 'bg-gray-100' : 'bg-gray-300',
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
        v-if="command.type === 'link' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <UIcon
            name="nimbus:link"
            class="size-5 relative top-[0.2rem]"
          />
          <a :href="command.value" target="_blank">{{ command.value }}</a>
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
          <span v-if="!command.value">{{ command.value }}</span>
          <span v-else v-html="command.value.replace(/\{([^}]+)\}/g, '<b>{$1}</b>')"></span>
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
          <video class="rounded-md mb-2 w-100 relative" :src="`/videos/${command.value}`" controls>
            <span>Seu navegador não é compatível.</span>
          </video>
          <i>{{command.caption}}</i>
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'image' && !editable"
      >
        <p class="text-ellipsis overflow-hidden m-1">
          <img class="rounded-md mb-2 w-100 relative" :src="`/images/${command.value}`" alt="Imagem" />
          <i>{{command.caption}}</i>
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'audio' && !editable"

      >
        <p class="text-ellipsis overflow-hidden">
          <audio class="rounded-md mb-2 w-100 relative" :src="`/audios/${command.value}`" controls>
            <span>Seu navegador não é compatível.</span>
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
          <audio class="rounded-md mb-2 w-100 relative" :src="`/audios/${command.value}`"  controls>
            Your browser does not support the audio element.
          </audio>
          <i>{{command.caption}}</i>
        </p>
      </section>

      <section v-if="editable">
        <section class="gap-5 flex-1" v-if="command.type === 'text'">
          <UFormGroup>
            <template #label>
            <p> <UIcon name="material-symbols:font-download-outline" size="15" class="relative top-[0.2rem]"/> Mensagem </p>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>

              <UTextarea v-model="command.value" placeholder="Olá...."/>
            </template>
          </UFormGroup>
          <br>
          <UFormGroup>
            <template #label>
            <span class="flex items-center justify-center">
              <p> <UIcon name="material-symbols:schedule-outline" size="15" class="relative top-[0.1rem]"/> Digitando... <strong>{{command.delay}} segundos</strong>. </p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <URange v-model="command.delay" :min="1" :max="140" class="mt-2" />
            </template>
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.action === 'delay'">
          <UFormGroup>
            <template #label>
            <p><UIcon name="material-symbols:schedule-outline" size="15" class="relative top-[0.1rem]" /> Atraso de <strong>{{command.value}}</strong> segundos.</p>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <URange v-model="command.value" :min="1" :max="140" class="mt-2"  />
            </template>
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.action === 'input'">

          <UFormGroup>
            <template #label>
              <p><UIcon name="fluent:braces-variable-20-filled" class="relative top-[0.1rem]"/> Nome da variável</p>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput v-model="command.name" placeholder="exemplo: nome" />
            </template>
          </UFormGroup>

        </section>


        <section class="gap-5 flex-1" v-else-if="command.type === 'link'">
          <UFormGroup>
            <template #label>
              <p><UIcon name="nimbus:link" class="relative top-[0.1rem]"/> URL do link</p>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput icon="nimbus:link" v-model="command.value" placeholder="https://seusite.com.br" />
            </template>
          </UFormGroup>
          </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'audio'">

          <UFormGroup>
            <template #label>
            <span class="flex items-center justify-center">
            <p><UIcon name="material-symbols:mic-outline" size="15" class="relative top-[0.2rem]" /> Audio</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <input
                class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none px-2.5 py-1.5 text-blue-950 text-sm font-normal border border-solid border-gray-100 focus:border-transparent focus:ring-blue-950"
                accept="audio/*"
                type="file"
                name="file"
                @change="(event) => handleChangeFile({ command, event: event, index })"
              />
            </template>
          </UFormGroup>
          <br>
          <UFormGroup>
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="material-symbols:schedule-outline" size="15" class="relative top-[0.1rem]" /> Gravando... <strong>{{command.delay}} segundos</strong>.</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <URange v-model="command.delay" :min="1" :max="140" class="mt-2" />
            </template>
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'image'">
          <UFormGroup>
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="material-symbols:imagesmode-outline" size="15" class="relative top-[0.2rem]" /> Imagem</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <input
                class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none px-2.5 py-1.5 text-blue-950 text-sm font-normal border border-solid border-gray-100 focus:border-transparent focus:ring-blue-950"
                accept="image/*"
                type="file"
                name="file"
                @change="(event) => handleChangeFile({ command, event: event, index })"
              />
            </template>
          </UFormGroup>
          <br />
          <UFormGroup>
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="fluent:closed-caption-20-regular" size="15" class="relative top-[0.2rem]" /> Descrição</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput v-model="command.caption" placeholder="Uma descrição..." />
            </template>
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'video'">
          <UFormGroup >
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="material-symbols:videocam-outline" size="15" class="relative top-[0.1rem]" /> Video</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <input
                class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none px-2.5 py-1.5 text-blue-950 text-sm font-normal border border-solid border-gray-100 focus:border-transparent focus:ring-blue-950"
                accept="video/*"
                type="file"
                name="file"
                @change="(event) => handleChangeFile({ command, event: event, index })"
              />
            </template>
          </UFormGroup>
          <br />

          <UFormGroup >
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="fluent:closed-caption-20-regular" size="15" class="relative top-[0.2rem]" /> Descrição</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput v-model="command.caption" placeholder="Uma descrição..." />
            </template>
          </UFormGroup>
        </section>

        <section class="gap-5 flex-1" v-else-if="command.type === 'media_audio'">

          <UFormGroup>
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="material-symbols:mic-outline" size="15" class="relative top-[0.2rem]" /> Audio em Media</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <input
                class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none form-input rounded-lg placeholder-gray-400 dark:placeholder-gray-500 file:mr-1.5 file:font-medium file:text-gray-500 dark:file:text-gray-400 file:bg-transparent file:border-0 file:p-0 file:outline-none px-2.5 py-1.5 text-blue-950 text-sm font-normal border border-solid border-gray-100 focus:border-transparent focus:ring-blue-950"
                accept="audio/*"
                type="file"
                name="file"
                @change="(event) => handleChangeFile({ command, event: event, index })"
              />
            </template>
          </UFormGroup>

          <br />
          <UFormGroup >
            <template #label>
            <span class="flex items-center justify-center">
              <p><UIcon name="fluent:closed-caption-20-regular" size="15" class="relative top-[0.2rem]" /> Descrição</p>
            </span>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput v-model="command.caption" placeholder="Uma descrição..." />
            </template>
          </UFormGroup>
        </section>
      </section>
      <UButton v-if="editable" truncate color="red" :padded="false" icon="line-md:close-small" label="remover" class="no-underline" variant="link" @click="removeCommand(command)"/>

    </UCard>
  </section>
</template>
