import axios from "axios";
import type { AxiosInstance } from "axios";
import { setupInterceptors } from "./interceptors";
import type { CreateAxiosOptions } from "./types";

export function createAxios(options: CreateAxiosOptions = {}): AxiosInstance {
  const defaultOptions: CreateAxiosOptions = {
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    timeout: Number(import.meta.env.VITE_AXIOS_TIMEOUT),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const service = axios.create({
    ...defaultOptions,
    ...options,
  });

  setupInterceptors(service);
  return service;
}

export const request = createAxios();

export const mockRequest = createAxios({
  baseURL: "/mock-api",
});

export type { ResponseResult } from "./types";
