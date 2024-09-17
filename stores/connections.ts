import type {
  IConnection,
  IConnectionPayload,
  IStateConnection,
} from "~/types";

const { get, post, put, destroy } = useMakeRequests();

export const useConnectionsStore = defineStore("connections", {
  state: (): IStateConnection => ({
    loading: false,
    connections: [],
    connection: {} as IConnection,
    instance: {},
    qrCode: null,
    token: null,
    ConnectionPayload: {} as IConnectionPayload,
  }),
  getters: {
    getConnections: (state) => state.connections,
    totalConnections: (state) => state.connections.length,
    isLoading: (state) => state.loading,
    getQrcode: (state) => state.qrCode || null,
    getToken: (state) => state.token || state.connection.token || null,
    getName: (state) => state.connection.name || "",
    getNumber: (state) => state.connection.connection_key || "",
    getFlowId: (state) => state.connection.flow_id || null,
    getConnection: (state) => (id: number) => {
      return state.connections.find((connection) => connection.id === id);
    },
    getPayload: (state) => {
      return {
        ...state.ConnectionPayload,
        connection_key: raw(state.ConnectionPayload.connection_key),
      };
    },
  },
  actions: {
    init() {
      this.token = null;
      this.qrCode = null;
      this.ConnectionPayload = {
        name: "",
        description: "",
        connection_key: "",
      };
    },
    reset() {
      this.instance = {};
      this.init();
    },

    async fetchConnections() {
      this.loading = true;

      await get("/connections")
        .then((res) => {
          this.connections = res.data.service;
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

      await post("/integration/whatsapp/create-connection", payload)
        .then((res) => {
          this.qrCode = res.data.service.qrcode?.base64;
          this.token = res.data.service.qrcode?.token;
        })

        .finally(() => {
          this.loading = false;
        });
    },
    async fetchConnection(id: number) {
      this.loading = true;

      await get(`/connection/${id}`)
        .then((res) => {
          const { payload, ...connection } = res.data.service;
          this.connection = connection;
          this.instance = payload;
          this.qrCode = res.data.service.qrcode?.base64;
          this.token = res.data.service.qrcode?.token;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async connectionStatus() {
      this.loading = true;

      await get(`/integration/whatsapp/${this.getToken}/connect`)
        .then((res) => {
          const qrCodeImage = res.data.service.base64;

          if (qrCodeImage) {
            this.qrCode = qrCodeImage;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async disconnectConnection() {
      await destroy(`/integration/whatsapp/${this.getToken}/disconnect`);
    },
    async deleteConnection() {
      await destroy(`/integration/whatsapp/${this.getToken}/delete`);
    },
    async selectFlow(flow_id: any) {
      this.loading = true;
      put(`/integration/whatsapp/select-flow/${this.connection.id}`, {
        flow_id: flow_id,
      }).finally(() => {
        this.loading = false;
      });
    },
    async sendMessage(number: string, message: string) {
      this.loading = true;

      const connectionKey = raw(number);

      const payload = {
        connection: this.getToken,
        number: connectionKey,
        delay: 10,
        type: "text",
        value: message,
      };

      await post("integration/whatsapp/send-message", payload).finally(() => {
        this.loading = false;
      });
    },

    // Events
    async onChangeConnectionStatus(data: any) {},
  },
});
