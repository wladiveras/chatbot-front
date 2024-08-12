export const getStorage = (item: string) => {
  if (import.meta.client) {
    return localStorage.getItem(item);
  }
};

export const setStorage = (item: string, value: any) => {
  if (import.meta.client) {
    return localStorage.setItem(item, value);
  }
};

export const removeStorage = (item: string) => {
  if (import.meta.client) {
    return localStorage.removeItem(item);
  }
};
