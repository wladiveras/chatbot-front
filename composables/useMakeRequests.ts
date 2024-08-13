export default function () {
  async function instance<T>(
    url: string,
    method: "get" | "post" | "put" | "delete",
    config?: any,
    body: any = {}
  ): Promise<T | any> {
    const runtimeConfig = useRuntimeConfig();

    const response = await $fetch(url, {
      baseURL: runtimeConfig.public.apiBaseServer,
      credentials: "include",
      method,
      body,
      ...config,
      onRequest({ request, options }) {
        const token = getStorage("token");

        const headers = {
          Accept: "application/json",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          ...options?.headers,
        };

        if (!!token) headers["Authorization"] = `Bearer ${token}`;

        options.headers = headers;
      }
    });
    
    if (response?.data?.success) return response;
    throw response;
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
