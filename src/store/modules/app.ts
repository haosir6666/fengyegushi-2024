import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const language = ref("zh-cn");

  return { language };
});
