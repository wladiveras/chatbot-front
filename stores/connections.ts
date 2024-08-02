import { defineStore } from "pinia";

const makeRequests = useMakeRequests();

export const useConnectionsStore = defineStore("connections", {
  state: () => ({
    connections: [],
    connection: [],
    qrCode: null,
  }),
  getters: {
    getConnections: (state) => state.connections,
    totalConnections: (state) => state.connections.length,
  },
  actions: {
    async fetchConnections() {
      await makeRequests
        .get("/connections")
        .then((res) => {
          this.connections = res.data.service.payload;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },

    async createConnection($data: any) {
      await makeRequests
        .post("/integration/whatsapp/create-connection", $data)
        .then((res) => {
          this.qrCode = res.data.service.payload.qrcode?.base64;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
  },
});
