import { useAuthStore } from "@/store";
import { resolveResError } from "./helpers";
import {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";

// 扩展 InternalAxiosRequestConfig
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  needTip?: boolean; // 添加 needTip 属性
  needToken?: boolean; // 添加 needToken 属性
}

export function setupInterceptors(axiosInstance: AxiosInstance) {
  const SUCCESS_CODES = [0, 200, 1, 2, 3];

  function resResolve(
    response: AxiosResponse,
    config: CustomAxiosRequestConfig
  ): Promise<any> {
    const { data, status, statusText, headers } = response;
    if (headers["content-type"]?.includes("json")) {
      if (SUCCESS_CODES.includes(data?.code)) {
        return Promise.resolve(data);
      }
      const code = data?.code ?? status;

      const needTip = config.needTip !== false;

      const message = resolveResError(code, data?.msg ?? statusText, needTip);

      return Promise.reject({ code, message, error: data ?? response });
    }
    return Promise.resolve(data ?? response);
  }

  axiosInstance.interceptors.request.use(reqResolve, reqReject);
  axiosInstance.interceptors.response.use(
    (response) =>
      resResolve(response, response.config as CustomAxiosRequestConfig),
    resReject
  );
}

function reqResolve(
  config: CustomAxiosRequestConfig
): CustomAxiosRequestConfig {
  if (config.needToken === false) {
    return config;
  }

  const { accessToken } = useAuthStore();
  if (accessToken) {
    // 确保 headers 存在
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

function reqReject(error: any): Promise<never> {
  return Promise.reject(error);
}

async function resReject(error: any): Promise<never> {
  if (!error || !error.response) {
    const code = error?.code;
    const message = resolveResError(code, error.msg);
    return Promise.reject({ code, message, error });
  }

  const { data, status, config, statusText } = error.response;
  const code = data?.code ?? status;

  const customConfig = config as CustomAxiosRequestConfig;
  const needTip = customConfig.needTip !== false;

  const message = resolveResError(code, data?.msg ?? statusText, needTip);
  return Promise.reject({
    code,
    message,
    error: error.response?.data || error.response,
  });
}
