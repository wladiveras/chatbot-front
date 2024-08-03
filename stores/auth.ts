import { defineStore } from "pinia";
import type { IStateAuth } from "@/types";

const { $localStorage } = useNuxtApp();
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
      this.token = $localStorage.getItem("token");
      this.user = JSON.parse($localStorage.getItem("user"));
    },
    async signIn(email: string) {
      await makeRequests.post("/auth/sign-in", { email });
    },
    async fetchUser() {
      await makeRequests
        .get("/auth/user")
        .then((res) => {
          $localStorage.setItem(
            "user",
            JSON.stringify(res.data.service.payload)
          );
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
