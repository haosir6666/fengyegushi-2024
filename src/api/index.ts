import { request } from "@/utils";
interface EmailCodeData {
  email: string;
  type: 1 | 2 | 3;
}
interface PhoneCodeData {
  phone: string;
  type: 1;
}
interface loginData {
  username: string;
  password: string;
}
interface responseData {
  code: number;
  message: string;
  data: any;
}

export default {
  /**
   * 获取用户信息
   * @returns
   */
  getUserInfo: (): Promise<responseData> => request.get("/user/loadUserInfo"),
  // 登录
  login: (data: loginData): Promise<responseData> =>
    request.post("/sys/login/user", data),
  // 登出
  logout: (): Promise<responseData> =>
    //@ts-ignore
    request.get("/sys/user/logout", {}, { needTip: false }),
  /**
   * 發送短信验证码
   * @param data
   * @returns
   */
  sendPhoneCode: (data: PhoneCodeData): Promise<responseData> =>
    request.post("/util/sendPhoneCode", data),

  /**
   * @description: 获取图形验证码
   */
  getCaptcha: (): Promise<responseData> => request.get("/util/captchaImage"),
  /**
   * @description: 生成邮箱验证码
   * @param {,email:邮箱加密,type:1:注册,2:找回密码,3:邮箱验证码} data
   */
  sendEmailCode: (data: EmailCodeData): Promise<responseData> =>
    request.post("/util/emailCode", data),
};
