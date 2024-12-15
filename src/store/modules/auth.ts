import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "token",
  () => {
    const accessToken = ref("123");

    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };

    const logout = () => {
      accessToken.value = "";
    };

    return { accessToken, setAccessToken, logout };
  },
  {
    persist: {
      storage: localStorage,
      key: "token",
    },
  }
);
