import { request } from "@/utils";
import type {
  RegisterData,
  ResponseData,
  PageParams,
  PageResult,
  InviteRecord,
  SponsorRecord,
  RebatePageResult,
} from "./types";

const api = {
  register: (data: RegisterData): Promise<ResponseData<void>> =>
    request.post("/user/register", data),

  readInviteList: (
    params: PageParams
  ): Promise<ResponseData<PageResult<InviteRecord>>> =>
    request.get("/invite/queryPage", { params }),

  weChat: (amount: number): Promise<ResponseData<string>> =>
    request.post("/pay/weChat", { amount }),

  aliPay: (amount: number): Promise<ResponseData<string>> =>
    request.post("/pay/aliPay", { amount }),

  payOrderOn: (orderOn: string): Promise<ResponseData<boolean>> =>
    request.get(`/pay/payOrderOn/${orderOn}`),

  readSponsorList: (
    params: PageParams
  ): Promise<ResponseData<PageResult<SponsorRecord>>> =>
    request.get("/pay/queryPage", { params }),

  readRebatesList: (
    params: PageParams
  ): Promise<ResponseData<RebatePageResult>> =>
    request.get("/invite/queryPageInvitePay", {
      params,
      needTip: false,
    }),
  /**
   * 獲得返利總額
   * @returns
   */
  readRebatesNum: (): Promise<ResponseData> =>
    request.get("/invite/loadInvitePaySum"),
};

export default api;
