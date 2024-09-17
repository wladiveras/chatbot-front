export const useMakeRequests = () => {
  const instance = async <T>(
    url: string,
    method: "get" | "post" | "put" | "delete",
    config?: any,
    body: any = {}
  ): Promise<T | any> => {
    const runtimeConfig = useRuntimeConfig();
    const toast = useToast();

    const response = await $fetch(url, {
      baseURL: runtimeConfig.public.apiBaseServer,
      credentials: "include",
      method,
      body,
      ...config,
      onRequest({ options }) {
        const token = localStorage.getItem("token");

        const headers = {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          ...options?.headers,
        };

        if (token) headers["Authorization"] = `Bearer ${token}`;

        options.headers = headers;
      },
      onResponse({ response }) {
        let data = response;
        data = data._data.data;

        if (data.success && method !== "get") {
          toast.add({
            icon: "i-heroicons-check-circle",
            title: data.title,
            description: data.message,
            color: "green",
          });
        } else if (!data.success) {
          toast.add({
            icon: "i-heroicons-exclamation-circle",
            title: data.title,
            description: data.message,
            color: "red",
          });
        }
      },
      onResponseError({ response }) {
        if (response.status >= 500) {
          toast.add({
            icon: "i-heroicons-exclamation-circle",
            title: "Oops, algo deu errado!",
            description:
              "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde ou contacte o suporte.",
            color: "red",
          });
        }
      },
    });

    return response;
  };

  // Types of requests
  const get = async <T>(url: string, config?: any) => {
    return await instance<T>(url, "get", config, null);
  };

  const post = async <T>(url: string, data?: any, config?: any) => {
    return await instance<T>(url, "post", config, data);
  };

  const put = async <T>(url: string, data?: any, config?: any) => {
    return await instance<T>(url, "put", config, data);
  };

  const destroy = async <T>(url: string, config?: any) => {
    return await instance<T>(url, "delete", config, null);
  };

  return {
    get,
    post,
    put,
    destroy,
  };
};
