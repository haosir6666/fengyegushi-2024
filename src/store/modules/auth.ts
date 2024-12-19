import { defineStore } from "pinia";
import router from "@/router";

type UserInfo = {
  id: number | null;
  username: string | null;
  nickname: string | null;
  loginTime: string | null;
  email: string | null;
  phone: string | null;
  inviteCode: string | null;
  bindingUser: string | null;
  avatar: string;
};

export const useAuthStore = defineStore(
  "token",
  () => {
    const accessToken = ref("123");
    const userInfo = ref<UserInfo>({
      id: null,
      username: null,
      nickname: null,
      loginTime: null,
      email: null,
      phone: null,
      inviteCode: null,
      bindingUser: null,
      avatar: "",
    });

    const setUserInfo = (data: UserInfo) => {
      userInfo.value = data;
      userInfo.value.avatar =
        "https://mxd.dvg.cn/dbsource/mobsource/Mob._Canvas.0120100.img.move.0.png";
    };

    const setAccessToken = (token: string) => {
      accessToken.value = token;
    };

    const logout = () => {
      accessToken.value = "";
      userInfo.value = {
        id: null,
        username: null,
        nickname: null,
        loginTime: null,
        email: null,
        phone: null,
        inviteCode: null,
        bindingUser: null,
        avatar: "",
      };
      router.push("/home");
    };

    return { accessToken, setAccessToken, logout, userInfo, setUserInfo };
  },
  {
    persist: {
      storage: localStorage,
      key: "token",
    },
  }
);
