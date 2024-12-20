import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import UnoCSS from "unocss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import ViteCompressionPlugin from "vite-plugin-compression";
import type { PreRenderedAsset } from "rollup";
import type { ConfigEnv, BuildOptions } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
type Recordable<T = any> = Record<string, T>;

const pathSrc = path.resolve(__dirname, "src");

interface ViteEnv {
  VITE_APP_TITLE: string;
  VITE_APP_PORT: number;
  VITE_BASE_URL: string;
  VITE_AXIOS_BASE_URL: string;
  VITE_AXIOS_TIMEOUT: number;
}

// 處理環境變量
function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_APP_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_AXIOS_TIMEOUT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
  }
  return ret;
}

// 插件配置
const vitePlugins = [
  vue(),
  UnoCSS(),
  AutoImport({
    imports: ["vue"],
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
    },
    dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"),
  }),
  Components({
    dts: path.resolve(pathSrc, "types", "components.d.ts"),
    resolvers: [
      AntDesignVueResolver({
        importStyle: false,
      }),
    ],
  }),
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    symbolId: "icon-[dir]-[name]",
  }),
  visualizer({ open: true }),
  // ViteCompressionPlugin({
  //   algorithm: "gzip",
  //   ext: ".gz",
  //   deleteOriginFile: true,
  // }),
  ViteImageOptimizer({
    jpg: {
      quality: 75, // 设置 JPEG 图像的压缩质量
    },
    png: {
      quality: 80, // 设置 PNG 图像的压缩质量范围
    },
    webp: {
      quality: 75, // 设置 WebP 图像的压缩质量
    },
    exclude: ["**/*.svg"], // 排除 svg 图标
  }),
];

// 構建配置
const buildOptions: BuildOptions = {
  outDir: "dist",
  assetsDir: "assets",
  sourcemap: process.env.NODE_ENV === "development", // 開啟 sourcemap 作用是方便開發者 debug
  cssCodeSplit: true, // 開啟 CSS 切割
  assetsInlineLimit: 4096, // 設定 inline 資源的大小上限
  chunkSizeWarningLimit: 2000, // 設定 chunk 大小警告的大小上限
  minify: "terser" as const, // 設定 minify 工具
  terserOptions: {
    compress: {
      // 設定 minify 壓縮設定
      keep_infinity: true,
      drop_console: process.env.NODE_ENV === "production",
      drop_debugger: process.env.NODE_ENV === "production",
    },
    format: {
      comments: false, // 移除所有註釋
    },
  },
  rollupOptions: {
    output: {
      entryFileNames: "js/[name].[hash].js",
      chunkFileNames: "js/[name].[hash].js",
      assetFileNames: (assetInfo: PreRenderedAsset): string => {
        const fileName = assetInfo.name || "";
        const info = fileName.split(".");
        let extType = info[info.length - 1] || "asset";

        if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(fileName)) {
          extType = "media";
        } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(fileName)) {
          extType = "img";
        } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(fileName)) {
          extType = "fonts";
        }
        return `${extType}/[name].[hash].[ext]`;
      },
      manualChunks: {
        vue: ["vue", "vue-router", "pinia"],
        "ant-design": ["ant-design-vue"],
      },
    },
  },
};

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  const viteEnv = wrapperEnv(env);

  return {
    base: viteEnv.VITE_BASE_URL,
    plugins: vitePlugins,
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    optimizeDeps: {
      include: ["vue", "vue-router", "pinia", "axios", "ant-design-vue"],
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_APP_PORT,
      open: true,
      proxy: {
        "/api": {
          target: viteEnv.VITE_AXIOS_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: buildOptions,
  };
});
