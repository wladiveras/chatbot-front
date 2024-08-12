import { defineStore } from "pinia";
import type { IStateAuth } from "@/types";

const makeRequests = useMakeRequests();

export const useAuthStore = defineStore("auth", {
  state: (): IStateAuth => ({
    user: {},
    token: null,
  }),
  getters: {
    userName: (state) => state.user?.name || "",
    userAvatar: (state) => state.user?.avatar || "",
    isAuthenticated: (state) => !!state.user && !!state.token,
  },
  actions: {
    init() {
      this.token = getStorage("token") ? getStorage("token") : null;
      this.user = getStorage("user") ? JSON.parse(getStorage("user")) : {};
    },
    async signIn(email: string) {
      await makeRequests.post("/auth/sign-in", { email });
    },
    async signOut() {
      const toast = useToast();
      removeStorage("token");
      removeStorage("user");
      toast.add({
        title: "Até mais!",
        description: "Desconectado da sua sessão, te espero em breve.",
        icon: "i-heroicons-check-badge",
      });
      navigateTo("/");
    },
    async fetchUser() {
      await makeRequests
        .get("/auth/user")
        .then((res) => {
          setStorage("user", JSON.stringify(res.data.service.payload));
          this.user = res.data.service.payload;
          navigateTo("/connections");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    async validateCode(code: string) {
      await makeRequests
        .post(`/auth/magic-link/${code}`)
        .then((res) => {
          this.token = res.data.service.payload;
          this.fetchUser();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
  },
});
