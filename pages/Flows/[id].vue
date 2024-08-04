<script setup lang="ts">
import { useEventListener } from "@vueuse/core"

import type { SpriteInst, SpriteProps } from "vue3-pixi"
import { useApplication, useScreen, useStage } from "vue3-pixi"

// todo: Pixi -->
const eventName = ref("none")

const nodes = [
  { x: 175, y: 75, scale: 1.2 },
  { x: 655, y: 75 },
  { x: 410, y: 325, rotation: Math.PI / 10 },
  { x: 150, y: 465, scale: 0.8 },
  { x: 685, y: 445, scale: { x: 0.8, y: 1.2 }, rotation: Math.PI },
]

const eventHandler = (name, evt) => {
  eventName.value = name
  console.log(name, evt)
}

function drawArc(e) {
  e.beginFill("#4f455c")
  e.arc(0, 0, 100, 0, Math.PI, false)
}

function onButtonDown() {}

function onButtonUp() {}

function onButtonOver() {}

function onButtonOut() {}

// Dragg

const stage = useStage()

// create a texture from an image path

const sprites = ref<Partial<SpriteProps>[]>([])
const target = ref<SpriteInst>()

function onDragStart(this: SpriteInst) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  // this.data = event.data;
  this.alpha = 0.5
  target.value = this
  stage.value.on("pointermove", onDragMove)
}

function onDragMove(event: any) {
  if (target.value) Object.assign(sprites.value[target.value!.zIndex], event.global)
}

function onDragEnd() {
  if (!target.value) return
  stage.value.off("pointermove", onDragMove)
  target.value.alpha = 1
  target.value = undefined
}

onReady((app) => {
  sprites.value = Array(10)
    .fill(undefined)
    .map(() => ({
      x: Math.floor(Math.random() * app.screen.width),
      y: Math.floor(Math.random() * app.screen.height),
      onPointerdown: onDragStart,
      nodes,
      scale: 3,
      anchor: 0.5,
    }))
  // Enable interactivity!
  app.stage.eventMode = "static"
  app.stage.hitArea = app.screen
})

useEventListener(stage, "pointerup", onDragEnd)
useEventListener(stage, "pointerupoutside", onDragEnd)
definePageMeta({
  layout: "flows",
})
</script>

<template>
  <main class="flex gap-5 w-full h-full">
    <aside v-if="true" class="w-full max-w-72 h-full border-r border-[#E5E5E5]">
      <header
        class="border-b border-[#E5E5E5] p-5 flex items-center justify-between text-gray-500 font-semibold text-base"
      >
        <section class="flex items-center gap-4">
          <UIcon name="material-symbols:inventory-2-outline" class="size-5" />
          <p>Conteúdo</p>
        </section>
        <UIcon class="size-6 cursor-pointer" name="material-symbols:close" @click="" />
      </header>
      <FlowsOptions />
    </aside>
    <section class="relative w-full h-full p-5">
      <UButton
        class="absolute right-5 z-50"
        icon="material-symbols:add"
        size="xl"
        @click=""
      />
      <Application :width="1630" :height="835">
        <text :anchor="0.5" :x="120" :y="120" :style="{ fill: 'white' }">
          Hello NuxtJS World
        </text>
        <graphics
          @render="drawArc"
          v-for="node in nodes"
          :key="node.x"
          :x="node.x"
          :y="node.y"
        />
      </Application>
    </section>
  </main>
</template>
