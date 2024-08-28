<script lang="ts" setup>
const flowsStore = useFlowsStore()
const { commands } = storeToRefs(flowsStore)

const emit = defineEmits(["close"])

const handleClose = () => {
  emit("close")
}
</script>
<template>
  <USlideover prevent-close>
    <UCard
      class="flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Preview
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="handleClose"
          />
        </div>
      </template>
      x
    </UCard>
  </USlideover>
</template>

<style></style>
