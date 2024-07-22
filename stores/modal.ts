export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  }});
