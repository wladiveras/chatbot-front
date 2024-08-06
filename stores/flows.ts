import { defineStore } from "pinia";
import type { IStateAuth } from "@/types";

const makeRequests = useMakeRequests();

export const useFlowsStore = defineStore("flows", {
  state: () => ({
    loading: false,
    flows: [],
    selectedNode: {},
    selectedFlow: {},

    //Exemplo de substituição pro storage funcionar com os dados do backend - tudo vem dentro do payload, recomendo puxar o node o edge idividualmente
    flow: {},
    nodes: [],
    edges: [],
    commands: [],
    currentCommands: [],
    modifying: false,
  }),
  getters: {
    getFlows: (state) => state.flows || [],
    totalFlows: (state) => state.flows.length,
    getNodes: (state) => state.nodes,
    getEdges: (state) => state.edges,
    getCommands: (state) => state.commands,
    flowName: (state) => state.flow.name || "Novo fluxo",
    flowDescription: (state) => state.flow.description || "Descrição do fluxo",
    isModifying: (state) => state.modifying,
    lastNode: (state) => state.nodes[state.nodes.length - 1],
  },
  actions: {
    setSelectedNode(node: any) {
      this.selectedNode = node;
      if (!!node) {
        this.currentCommands = this.commands.filter(
          (command) => command.node_id === Number(this.selectedNode.id)
        );
        return;
      }
      this.currentCommands = [];
    },

    async fetchFlows() {
      this.loading = true;
      await makeRequests
        .get("/flow")
        .then((res) => {
          this.flows = res.data.service.payload;
          this.modifying = false;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async fetchFlow(id: any) {
      this.loading = true;

      await makeRequests
        .get(`/flow/${id}`)
        .then((res) => {
          const { node, edge, commands, ...flow } = res.data.service.payload;

          this.flow = flow;
          this.nodes = JSON.parse(node);
          this.edges = JSON.parse(edge);
          this.commands = JSON.parse(commands);
          this.modifying = true;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async updateFlow() {
      const toast = useToast();

      this.loading = true;
      makeRequests
        .update(`/flow/${this.flow.id}`, {
          ...this.flow,
          node: this.nodes,
          edge: this.edges,
          commands: this.commands,
        })
        .then(() => {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: `O fluxo foi atualizado com sucesso.`,
            color: "green",
          });
        })
        .catch(() => {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: `Não foi possível atualizar a o fluxo.`,
            color: "red",
          });
        })
        .finally(() => {
          this.loading = false;
          this.modifying = false;
        });
    },
  },
});
