<script setup>
import { useVueFlow } from '@vue-flow/core';

const flowsStore = useFlowsStore()
const { selectedNode, currentCommands } = storeToRefs(flowsStore)

const { updateNode } = useVueFlow()

const props = defineProps({
  editable: {
    type: Boolean,
    default: false,
    required: false,
  },
  node: {
    type: Object,
    default: 0,
    required: false,
  }
})

const commands = ref([...props?.node?.data?.commands]);
</script>

<template>
  <!--  -->
  <section class="flex flex-col gap-5" v-if="node?.data?.commands?.length && !currentCommands.lenght">
    <UCard
      v-for="(command, index) in node.data.commands"
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
          <i>{{command.caption}}</i>
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'image' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <NuxtImg :src="command.value" alt="Imagem" />
          <i>{{command.caption}}</i>
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
          <UFormGroup>
            <template #label>
            <p> <UIcon name="material-symbols:font-download-outline" size="15" class="relative top-[0.2rem]"/> Mensagem </p>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput v-model="command.value" placeholder="Olá...."/>
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/audio.mp3" />
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/image.jpg" />
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/video.mp4" />
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
          <UFormGroup label="Media Audio">

          </UFormGroup>
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/audio.mp3" />
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
    </UCard>
  </section>
  <!-- To edit -->
  <section class="flex flex-col gap-5" v-if="currentCommands.lenght">
    <UCard
      v-for="(command, index) in currentCommands"
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
          <i>{{command.caption}}</i>
        </p>
      </section>

      <section
        class="flex items-center gap-3"
        v-if="command.type == 'image' && !editable"
      >
        <p class="text-ellipsis overflow-hidden">
          <NuxtImg :src="command.value" alt="Imagem" />
          <i>{{command.caption}}</i>
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
          <UFormGroup>
            <template #label>
            <p> <UIcon name="material-symbols:font-download-outline" size="15" class="relative top-[0.2rem]"/> Mensagem </p>
            </template>
            <template #help>
            <!-- todo -->
            </template>
            <template #default>
              <UInput v-model="command.value" placeholder="Olá...."/>
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/audio.mp3" />
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/image.jpg" />
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/video.mp4" />
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
          <UFormGroup label="Media Audio">

          </UFormGroup>
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
              <UInput v-model="command.value" placeholder="https://exemplo.com/audio.mp3" />
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
    </UCard>
  </section>
</template>
