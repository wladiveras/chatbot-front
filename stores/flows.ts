import { defineStore } from "pinia";
import type { IFlow } from "~/types";

const makeRequests = useMakeRequests();

export const useFlowsStore = defineStore("flows", {
  state: (): IFlow => ({
    loading: false,
    flows: [],
    selectedNode: {},
    selectedFlow: {},
    flow: {},
    nodes: [],
    edges: [],
    commands: [],
    commandsList: [],
    modifying: false,
    isCreation: false,
    uploadProgress: 0,
  }),
  getters: {
    getFlows: (state) => state.flows || [],
    totalFlows: (state) => state.flows.length,
    getNodes: (state) => state.nodes,
    getEdges: (state) => state.edges,
    getCommands: (state) => state.commands,
    flowName: (state) => state.flow.name || "Novo fluxo",
    flowDescription: (state) => state.flow.description || "Descrição do fluxo",
    flowById: (state) => (id: number) => {
      return state.flows.find((flow) => flow.id === id);
    },
    isModifying: (state) => state.modifying,
    isLoading: (state) => state.loading,
    lastNode: (state) => state.nodes[state.nodes.length - 1],
  },
  actions: {
    setSelectedNode(node: any) {
      this.selectedNode = node;
    },
    createCommands() {
      const extractCommandsFromNodes = (nodes: any) => {
        return nodes
          .map((node: any) => {
            if (!node.data.commands) {
              return [];
            }
            return node.data.commands.map((command: any) => {
              const nodeId = node.id;
              const { icon, ...rest } = command;
              const filteredCommand = Object.fromEntries(
                Object.entries(rest).filter(([_, value]) => value !== null)
              );
              return { ...filteredCommand, nodeId };
            });
          })
          .flat();
      };

      let edges = this.edges.map((node) => {
        const { source, target } = node;
        return [source, target];
      });

      edges = [...new Set(edges.flat())];

      let commands = extractCommandsFromNodes(this.nodes);

      this.commandsList = commands
        .filter((command: any) => edges.includes(command.nodeId))
        .sort((a: any, b: any) => {
          return edges.indexOf(a.nodeId) - edges.indexOf(b.nodeId);
        });
    },
    async handleFlowActive() {},
    async resetFlowSession() {
      const toast = useToast();

      await makeRequests
        .destroy(`/flow/${this.flow.id}/reset`)
        .then(() => {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: `As sessões foram reiniciadas com sucesso.`,
            color: "green",
          });
        })
        .catch(() => {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: `Não foi possível reiniciadas as sessões.`,
            color: "red",
          });
        })
        .finally(() => {});
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
      if (id === "new") {
        this.isCreation = true;
        this.flow = initialFlow;
        this.nodes = initialNodes;
        this.edges = initialEdges;
        return;
      }

      this.isCreation = false;
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

      await makeRequests
        .update(`/flow/${this.flow.id}`, {
          ...this.flow,
          node: this.nodes,
          edge: this.edges,
          commands: this.commandsList,
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
    async createFlow() {
      const toast = useToast();
      this.loading = true;
      await makeRequests
        .post(`/flow`, {
          ...this.flow,
          node: this.nodes,
          edge: this.edges,
          commands: this.commandsList,
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
    async removeFlow(id: number) {
      const toast = useToast();
      this.loading = true;

      await makeRequests
        .destroy(`/flow/${id}`)
        .then(() => {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: `O fluxo foi removido com sucesso.`,
            color: "green",
          });
        })
        .catch(() => {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: `Não foi possível remover a o fluxo.`,
            color: "red",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async resolveAction() {
      this.loading = true;
      this.createCommands();

      if (this.isCreation) {
        await this.createFlow()
          .then(() => {
            navigateTo(`/flows`);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        await this.updateFlow().finally(() => {
          this.loading = false;
        });
      }
    },
  },
});
