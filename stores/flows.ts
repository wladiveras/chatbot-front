import { defineStore } from 'pinia'
import { FLOWS } from "@/__mocks__/flows";

const TESTING = true;

export const useFlowsStore = defineStore('flows', {
  state: () => ({
    flows: [],
    nodes: [],
    edges: [],
    selectedNode: {}
  }),
  getters: {
    getFlows: (state) => state.flows,
    totalFlows: (state) => state.flows.length,
    getNodes: (state) => state.nodes,
    getEdges: (state) => state.edges
  },
  actions: {
    setSelectedNode(node) {
      this.selectedNode = node;
    },

    async fetchFlows() {
      if (TESTING) {
        this.flows = FLOWS;
      }
    },
    async fetchNodes() {},
    async fetchEdges() {},
  }
});
