const makeRequests = useMakeRequests();

export const useConnectionsStore = defineStore("connections", {
  state: () => ({
    loading: false,
    connections: [],
    connection: [],
    qrCode: null,
    ConnectionPayload: {
      name: "",
      description: "",
      connection_key: "",
    },
  }),
  getters: {
    getConnections: (state) => state.connections,
    totalConnections: (state) => state.connections.length,
    getQrcode: (state) => state.qrCode || "",
    getPayload: (state) => {
      return {
        ...state.ConnectionPayload,
        connection_key: raw(state.ConnectionPayload.connection_key),
      };
    },
  },
  actions: {
    init() {
      this.qrCode = null;
      this.ConnectionPayload = {
        name: "",
        description: "",
        connection_key: "",
      };
    },
    async fetchConnections() {
      this.loading = true;

      await makeRequests
        .get("/connections")
        .then((res) => {
          this.connections = res.data.service.payload;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async createConnection() {
      this.loading = true;
      const connectionKey = raw(this.ConnectionPayload.connection_key);

      const payload = {
        name: this.ConnectionPayload.name,
        description: this.ConnectionPayload.description,
        connection_key: connectionKey,
      };

      await makeRequests
        .post("/integration/whatsapp/create-connection", payload)
        .then((res) => {
          this.qrCode = res.data.service.payload.qrcode?.base64;
        })

        .finally(() => {
          this.loading = false;
        });
    },
  },
});
