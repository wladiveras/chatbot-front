export default function () {
  async function instance<T>(
    url: string,
    method: "get" | "post" | "put" | "delete",
    config?: any,
    body: any = {}
  ): Promise<T | any> {
    const runtimeConfig = useRuntimeConfig();

    const { data, status, error } = await useFetch(url, {
      baseURL: runtimeConfig.public.apiBase,
      credentials: "include",
      method,
      body,
      ...config,
      onRequest({ request, options }) {
        const token = localStorage.getItem("token");
        const headers = {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "https://api.marinabot.com.br",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          ...options?.headers,
        };

        if (!!token) headers["Authorization"] = `Bearer ${token}`;

        options.headers = headers;
      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
      },
      onResponse({ request, response, options }) {
        const isMagicLinkRequest = request
          .toString()
          .includes("/auth/magic-link");
        if (isMagicLinkRequest) {
          localStorage.setItem(
            "token",
            response._data.data.service.payload || ""
          );
        }
      },
      onResponseError({ request, response, options }) {
        // Handle the response errors
      },
    });

    if (status.value === "error") throw error.value;
    return data.value;
  }

  async function get<T>(url: string, config?: any) {
    return await instance<T>(url, "get", config, null);
  }

  async function post<T>(url: string, data?: any, config?: any) {
    return await instance<T>(url, "post", config, data);
  }

  async function update<T>(url: string, data?: any, config?: any) {
    return await instance<T>(url, "put", config, data);
  }

  async function destroy<T>(url: string, config?: any) {
    return await instance<T>(url, "delete", config, null);
  }

  return {
    get,
    post,
    update,
    destroy,
  };
}
