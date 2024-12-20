import { createI18n } from "vue-i18n";
import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";
import enLocale from "./en";
import zhCnLocale from "./zh-cn";
import { useAppStore } from "@/store";

export type LocaleType = keyof typeof messages;

const messages = {
  "zh-cn": {
    ...zhCnLocale,
  },
  en: {
    ...enLocale,
  },
} as const;

const i18nConfig: I18nOptions = {
  legacy: false,
  locale: "zh-cn",
  messages,
  sync: true,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
};

export let i18n: I18n;

export function setupI18n(app: App) {
  const appStore = useAppStore();
  i18n = createI18n({
    ...i18nConfig,
    locale: appStore.getLanguage || i18nConfig.locale,
  });

  app.use(i18n);
}

export function t(key: string): string {
  return (i18n.global.t as (key: string) => string)(key); // 类型断言为可调用
}

export function setLocale(locale: LocaleType) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
}
