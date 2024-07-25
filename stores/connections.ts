import { defineStore } from 'pinia'
import { CONNECTION } from "@/__mocks__/connections"

const TESTING = true;

export const useConnectionsStore = defineStore('connections', {
  state: () => ({
    connections: []
  }),
  getters: {
    getConnections: (state) => state.connections,
    totalConnections: (state) => state.connections.length,
  },
  actions: {
    async fetchConnections() {
      if (TESTING) {
        this.connections = CONNECTION;
      }
    }
  }
});
