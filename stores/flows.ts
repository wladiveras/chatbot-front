import { defineStore } from 'pinia'
import { FLOWS } from "@/__mocks__/flows";

const TESTING = true;

export const useFlowsStore = defineStore('flows', {
  state: () => ({
    flows: []
  }),
  getters: {
    getFlows: (state) => state.flows,
    totalFlows: (state) => state.flows.length
  },
  actions: {
    async fetchFlows() {
      if (TESTING) {
        this.flows = FLOWS;
      }
    }
  }
});
