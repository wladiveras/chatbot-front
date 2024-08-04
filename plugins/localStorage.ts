export default defineNuxtPlugin(() => {
  return {
    provide: {
      localStorage: {
        getItem(item: string) {
          if (import.meta.client) {
            return localStorage.getItem(item);
          } else {
            return undefined;
          }
        },

        setItem(item: string, value: any) {
          if (import.meta.client) {
            return localStorage.setItem(item, value);
          }
        },
      },
    },
  };
});
