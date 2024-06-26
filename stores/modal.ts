export const useModalStore = defineStore('modal', {
  state: () => ({
    open: false
  }),
  getters: {
    isOpen: (state) => state.open,
  },
  actions: {
    toggle() {
      this.open = !this.open;
    },
  }});
