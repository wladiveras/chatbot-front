import { defineStore } from "pinia";
import type { IStateAuth } from "@/types";

const { get, post, put } = useMakeRequests();

export const useAuthStore = defineStore("auth", {
  state: (): IStateAuth => ({
    user: {},
    token: null,

    // All loading states
    isLoadingSignIn: false,
    isLoadingUpdateDetails: false,
  }),
  getters: {
    userName: (state) => state.user?.name,
    userAvatar: (state) => state.user?.avatar || "",
    isAuthenticated: (state) => state.user && state.token,
    isMissingDetails: (state) => !state.user?.name,
  },
  actions: {
    init() {
      this.token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
      this.user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};
    },
    async signIn(email: string) {
      this.isLoadingSignIn = true;

      post("/auth/sign-in", { email }).finally(() => {
        this.isLoadingSignIn = false;
      });
    },
    async signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigateTo("/");
    },
    async updateDetails(name: string) {
      this.isLoadingUpdateDetails = true;
      // If some data is missing, wee need to force user to update data.
      this.user.name = name;

      return await this.updateUser().finally(() => {
        this.isLoadingUpdateDetails = false;
      });
    },
    async updateUser() {
      await put(`/user/${this.user.id}`, this.user).then(async () => {
        await this.reloadUser();
      });
    },
    async reloadUser() {
      localStorage.removeItem("user");
      await this.fetchUser();
    },

    async fetchUser() {
      await get("/auth/user")
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.service));

          this.user = res.data.service;

          navigateTo("/connections");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
    async validateCode(code: string) {
      await post(`/auth/magic-link/${code}`)
        .then((res) => {
          this.token = res.data.service;
          localStorage.setItem("token", this.token);
          this.fetchUser();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    },
  },
});
