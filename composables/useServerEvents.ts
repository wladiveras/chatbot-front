interface EventData {
  message: string;
  timestamp: string;
}

export function useServerEvents() {
  const eventSource = ref<EventSource | null>(null);
  const serverEventsStore = useServerEventsStore();
  const isConnected = ref(false);
  const hasError = ref(false);
  const reconnectInterval = ref<number | null>(null);
  const maxReconnectDelay = 30000; // Maximum reconnect delay of 30 seconds
  let reconnectAttempts = 0;

  const handleEvent = (event: MessageEvent) => {
    let eventData: EventData;

    try {
      eventData = JSON.parse(event.data);
    } catch (e) {
      console.error("Failed to parse ping event data:", e);
      return;
    }

    //serverEventsStore.addEvent(eventData);
  };

  const connect = () => {
    disconnect();

    const config = useRuntimeConfig();

    try {
      eventSource.value = new EventSource(
        `${config.public.apiBaseServer}/server-events`
      );

      eventSource.value.onopen = () => {
        console.log("SSE connection opened");
        serverEventsStore.setConnected(true);
        isConnected.value = true;
        hasError.value = false;
        reconnectAttempts = 0;
      };

      eventSource.value.addEventListener("ping", handleEvent);

      eventSource.value.onmessage = () => {
        // Update isConnected on each received message
        isConnected.value = true;
      };

      eventSource.value.onerror = (error) => {
        console.error("EventSource failed:", error);
        serverEventsStore.setConnected(false);
        isConnected.value = false;
        hasError.value = true;
        eventSource.value?.close();
        scheduleReconnect();
      };
    } catch (error) {
      console.error("Failed to create EventSource:", error);
      serverEventsStore.setConnected(false);
      isConnected.value = false;
      hasError.value = true;
      scheduleReconnect();
    }
  };

  const scheduleReconnect = () => {
    reconnectAttempts++;
    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttempts),
      maxReconnectDelay
    );
    console.log(`Scheduling reconnect in ${delay}ms`);
    reconnectInterval.value = window.setTimeout(() => {
      console.log("Attempting to reconnect...");
      connect();
    }, delay);
  };

  const disconnect = () => {
    if (eventSource.value) {
      eventSource.value.removeEventListener("ping", handleEvent);
      eventSource.value.close();
      eventSource.value = null;
    }
    if (reconnectInterval.value !== null) {
      clearTimeout(reconnectInterval.value);
      reconnectInterval.value = null;
    }
    serverEventsStore.setConnected(false);
    isConnected.value = false;
    hasError.value = false;
    reconnectAttempts = 0;
  };

  return {
    connect,
    disconnect,
    isConnected,
    hasError,
  };
}
