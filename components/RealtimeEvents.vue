<template>
  <!-- DEBUG -->
  <div>
    <!-- <p>Connection status: {{ isConnected ? 'Connected' : 'Disconnected' }}</p>
    <p v-if="hasError">There was an error with the connection</p>
    <div v-for="(eventList, eventType) in events" :key="eventType">
      <h3>{{ eventType }}</h3>
      <ul>
        <li v-for="(event, index) in eventList" :key="index">
          {{ JSON.stringify(event) }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup>
const { connect, disconnect,  isConnected, hasError } = useServerEvents()

onMounted(() => {
  connect()
})

onUnmounted(() => {
  disconnect()
})


</script>
