// src/lang/index.ts
import { createI18n } from "vue-i18n";
import type { App } from "vue";
import enLocale from "./en";
import zhCnLocale from "./zh-cn";
import { useAppStore } from "@/store";
const messages = {
  "zh-cn": {
    ...zhCnLocale,
  },
  en: {
    ...enLocale,
  },
};

// 创建 i18n 实例
export function setupI18n(app: App) {
  const appStore = useAppStore();
  const i18n = createI18n({
    legacy: false,
    locale: appStore.getLanguage || "zh-cn", // 获取语言
    messages: messages,
  });

  app.use(i18n);
}
