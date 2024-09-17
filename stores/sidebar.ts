export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    expanded: true,
  }),
  getters: {
    isExpanded: (state) => state.expanded,
  },
  actions: {
    toggleSize() {
      this.expanded = !this.expanded;
    },
  },
});
