import { defineStore } from "pinia";
import type { IStateAuth } from "@/types";
const makeRequests = useMakeRequests();

const toast = useToast();
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
    commandsList: [],
    modifying: false,
    isCreation: false
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
    },
    createCommands() {
      const extractCommandsFromNodes = (nodes) => {
        return nodes
          .map((node) => {
            if (!node.data.commands) {
              return [];
            }
            return node.data.commands.map((command) => {
              const nodeId = node.id;
              const { icon, ...rest } = command;
              return { ...rest, nodeId };
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
        .filter((command) => edges.includes(command.nodeId))
        .sort((a, b) => {
          return edges.indexOf(a.nodeId) - edges.indexOf(b.nodeId);
        });
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
          if (this?.commands?.length) {
            this.nodes = this.nodes.map(item => ({
              ...item,
              data: {
                ...item.data,
                commands: this.commands.filter(command => Number(command.nodeId) === Number(item.id))
              }
            }));
          }

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
      this.loading = true;
      await makeRequests
        .update(`/flow/${this.flow.id}`, {
          ...this.flow,
          node: this.nodes,
          edge: this.edges,
          commands: this.commandsList
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
      this.loading = true;
      await makeRequests
      .post(`/flow`, {
        ...this.flow,
        node: this.nodes,
        edge: this.edges,
        commands: this.commandsList
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
        this.loading = true;
        this.modifying = false;
      });
    },
    async removeFlow(id: number) {
      await makeRequests.destroy(`/flow/${id}`)
      .then(() => {})
      .catch(() => {})
      .finally(() => {})
    }
  },
});
