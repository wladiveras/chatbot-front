<script setup lang="ts">
const upload = useUpload("/api/blob", { method: "PUT" })

async function onFileSelect({ target }: Event) {
  const uploaded = await upload(target as HTMLInputElement)

  console.log({ test: uploaded })
}
</script>

<template>
  <input accept="jpeg, png" type="file" name="file" multiple @change="onFileSelect" />
</template>
