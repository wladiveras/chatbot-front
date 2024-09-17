import type { PingData } from "~/types";
export const useServerEventsStore = defineStore("serverEvents", {
  state: () => ({
    events: [] as PingData[],
    isConnected: false,
  }),
  actions: {
    addEvent(pingData: any) {
      this.events.push(pingData);
    },
    setConnected(status: boolean) {
      this.isConnected = status;
    },
    clearAll() {
      this.events = [];
    },
  },
});
