import type { AxiosRequestConfig } from "axios";

export interface CreateAxiosOptions extends AxiosRequestConfig {
  baseURL?: string;
  timeout?: number;
  needToken?: boolean;
  needTip?: boolean;
}

export interface RequestOptions {
  needToken?: boolean;
  needTip?: boolean;
}

// 擴展 AxiosRequestConfig 類型
declare module "axios" {
  export interface AxiosRequestConfig {
    needToken?: boolean;
    needTip?: boolean;
  }

  export interface InternalAxiosRequestConfig extends AxiosRequestConfig {
    needToken?: boolean;
    needTip?: boolean;
  }

  export interface AxiosResponse<T = any, D = any> {
    data: T;
    status: number;
    statusText: string;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config: InternalAxiosRequestConfig<D>;
    request?: any;
  }
}

export interface ResponseResult<T = any> {
  code: number;
  message: string;
  data: T;
}
