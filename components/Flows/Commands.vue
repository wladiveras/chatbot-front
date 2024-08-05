<script setup>
const flowsStore = useFlowsStore();
const { currentCommands, commands } = storeToRefs(flowsStore);

const props = defineProps({
  editable: {
    type: Boolean,
    default: false,
    required: false
  },
  nodeId: {
    type: Number,
    default: 0,
    required: false
  }
})

const auxCommands = computed(() => {
  return !!props.nodeId 
    ? commands.value.filter(command => command.node_id === props.nodeId) 
    : currentCommands.value;
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
      <section class="flex items-center gap-3">
        <UIcon 
          :name="command?.icon"
          class="size-5"
        />
        <p class="text-ellipsis overflow-hidden">
          {{ command.value }}
        </p>
      </section>
      <section v-if="editable">
        <UInput v-model="command.value" />
      </section>
    </UCard>
  </section>
</template>