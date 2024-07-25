import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header', {
  state: () => ({
    component: null
  }),
  getters: {
    getComponent: (state) => state.component,
  },
  actions: {
    setComponent(component) {
      this.component = component;
    }
  }
});
