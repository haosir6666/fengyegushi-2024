import { request } from "@/utils";
interface registerData {
  username: string;
  password: string;
  nickname: string;
  phone: string;
  code: string;
  inviteCode?: string;
}

interface responseData {
  code: number;
  message: string;
  data: any;
}

export default {
  /**
   * 注冊
   * @param data
   * @returns
   */
  register: (data: registerData): Promise<responseData> =>
    request.post("/user/register", data),
};
