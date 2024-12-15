import { defineStore } from "pinia";

export const useAppStore = defineStore(
  "app",
  () => {
    const language = ref("zh-cn");

    const getLanguage = computed(() => language.value);

    const setLanguage = (lang: string) => {
      language.value = lang;
    };

    return { language, getLanguage, setLanguage };
  },
  {
    persist: {
      storage: localStorage,
      key: "app",
    },
  }
);
