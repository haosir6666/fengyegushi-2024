import { defineStore } from "pinia";

export const useAppStore = defineStore(
  "app",
  () => {
    const language = ref("zh-cn");
    const loginBox = ref(false); //是否显示登录框
    const Signed = ref(false); //是否登陆过，如果没有，则最初显示注册

    const getLanguage = computed(() => language.value);

    const setLanguage = (lang: string) => {
      language.value = lang;
    };

    const handleLoginBox = (status = !loginBox.value) => {
      loginBox.value = status;
    };
    const handleSigned = (status = !Signed.value) => {
      Signed.value = status;
    };

    return {
      language,
      getLanguage,
      setLanguage,
      loginBox,
      handleLoginBox,
      Signed,
      handleSigned,
    };
  },
  {
    persist: {
      storage: localStorage,
      key: "app",
    },
  }
);
