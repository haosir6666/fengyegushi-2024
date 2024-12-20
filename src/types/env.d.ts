// src/types/env.d.ts
interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string;
  /**
   * 应用端口
   */
  VITE_APP_PORT: number;
  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string;
  /**
   * 接口地址
   */
  VITE_AXIOS_BASE_URL: string;
  /**
   * 超时时间
   */
  VITE_AXIOS_TIMEOUT: number;

  /**
   * 打包
   */
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
