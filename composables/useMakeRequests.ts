

const runtimeConfig = useRuntimeConfig()
const xsrfToken = useCookie("XSRF-TOKEN")

console.log({
  test: xsrfToken.value,
})

export default function () {


  async function instance<T>(
    url: string,
    method: "get" | "post" | "put" | "delete" = "get",
    config?: any,
    body: any = {},
  ): Promise<T | any> {


    const { data, status, error } = await useFetch(url, {
      baseURL: runtimeConfig.public.apiBase,
      credentials: "include",
      method,
      body,
      ...config,
      onRequest({ request, options }) {
        // Set the request headers
        options.headers = {
          "Accept": "application/json",
          "Cache-Control": "no-cache",
          "X-XSRF-TOKEN": xsrfToken.value, // Ensure 'token' is defined and holds the CSRF token
          ...options?.headers,
          // Authorization: `Bearer ${token}`, // Assuming you have a token variable
        };

      },
      onRequestError({ request, options, error }) {
        // Handle the request errors
      },
      onResponse({ request, response, options }) {
        // Process the response data
        // localStorage.setItem('access_token', response._data.token)
      },
      onResponseError({ request, response, options }) {
        // Handle the response errors
      }
    });
  }
  /**
   *
   * @param url
   * @param config
   * @returns { data }
   * @example
   *  const makeRequests = useMakeRequests();
   *  makeRequests.read("/users", { query: { param2: 'value2' } });
   */
  async function get<T>(url: string, config?: any) {
    return await instance<T>(url, "get", config, null);
  }

  async function post<T>(url: string, data?: any, config?: any) {
    return await instance<T>(url, "post", config, data);
  }

  async function update<T>(url: string, data?: any, config?: any) {
    return await instance<T>(url, "put", config, data);
  }

  async function remove<T>(url: string, config?: any) {
    return await instance<T>(url, "delete", config, null);
  }

  return {
    get,
    post,
    update,
    remove
  }
}
