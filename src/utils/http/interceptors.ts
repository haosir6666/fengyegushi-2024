import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/store";
import { resolveResError } from "./helpers";
import { message as AntMessage } from "ant-design-vue";

const SUCCESS_CODES = [200] as const;

export function setupInterceptors(axiosInstance: AxiosInstance): void {
  axiosInstance.interceptors.request.use(
    requestInterceptor,
    requestErrorHandler
  );
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    responseErrorHandler
  );
}

function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  if (config.needToken === false) {
    return config;
  }

  const { accessToken } = useAuthStore();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}

function requestErrorHandler(error: any): Promise<never> {
  return Promise.reject(error);
}

function responseInterceptor(response: AxiosResponse): Promise<any> {
  const { data, status, statusText, headers, config } = response;

  if (headers["content-type"]?.includes("json")) {
    if (SUCCESS_CODES.includes(data?.code)) {
      return Promise.resolve(data);
    }

    const code = data?.code ?? status;
    const needTip = config.needTip !== false;
    const errorMessage = resolveResError(
      code,
      data?.message ?? statusText,
      needTip
    );

    if (needTip) {
      return Promise.reject({
        code,
        message: errorMessage,
        data: data ?? null,
      });
    }

    return Promise.resolve({
      code,
      message: "Ignored error",
      data: data ?? null,
    });
  }

  return Promise.resolve(data);
}

function responseErrorHandler(error: any): Promise<never> {
  const response = error.response;
  const needTip = response?.config?.needTip !== false;

  if (!response) {
    if (needTip) {
      AntMessage.error("網路錯誤");
    }
    return Promise.reject({
      code: -1,
      message: "網路錯誤",
      data: error,
    });
  }

  const { data, status, statusText } = response;
  const code = data?.code ?? status;
  const errorMessage = resolveResError(
    code,
    data?.message ?? statusText,
    needTip
  );

  if (needTip) {
    AntMessage.error(errorMessage);
  }

  return Promise.reject({
    code,
    message: errorMessage,
    data: data || response,
  });
}
