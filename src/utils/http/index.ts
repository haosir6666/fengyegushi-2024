import axios from "axios";
import { setupInterceptors } from "./interceptors";

export function createAxios(options: any = {}) {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
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
