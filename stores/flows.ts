import { defineStore } from "pinia";
import type { IStateAuth } from "@/types";

const makeRequests = useMakeRequests();

export const useFlowsStore = defineStore("flows", {
  state: () => ({
    flows: [],
    //nodes: [],
    //edges: [],
    selectedNode: {},

    //Exemplo de substituição pro storage funcionar com os dados do backend - tudo vem dentro do payload, recomendo puxar o node o edge idividualmente
    flow: {},
    node: [],
    edge: [],
    commands: [],
    modifying: false,
  }),
  getters: {
    getFlows: (state) => state.flows,
    totalFlows: (state) => state.flows.length,
    getNode: (state) => state.node,
    getEdge: (state) => state.edge,
    getCommand: (state) => state.edge,
    flowName: (state) => state.flow.name || "Novo fluxo",
    flowDescription: (state) => state.flow.description || "Descrição do fluxo",
    isModifying: (state) => state.modifying,
  },
  actions: {
    setSelectedNode(node) {
      this.selectedNode = node;
    },

    async fetchFlows() {
      await makeRequests
        .get("/flow")
        .then((res) => {
          this.flows = res.data.service.payload;
          this.modifying = false;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    async fetchFlow(id: any) {
      await makeRequests
        .get(`/flow/${id}`)
        .then((res) => {
          const { node, edge, commands, ...flow } = res.data.service.payload;

          this.flow = flow;
          this.node = node;
          this.edge = edge;
          this.commands = commands;
          this.modifying = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    async fetchNodes() {},
    async fetchEdges() {},
  },
});
