interface ParamsType {
  [key: string]: string | number | boolean | undefined | object;
}

interface CustomFetchConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  data?: any;
  params?: ParamsType;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export type { CustomFetchConfig, ParamsType };
