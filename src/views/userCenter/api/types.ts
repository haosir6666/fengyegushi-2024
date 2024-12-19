export interface RegisterData {
  username: string;
  password: string;
  nickname: string;
  phone: string;
  code: string;
  inviteCode?: string;
}

export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PageParams {
  pageNo: number;
  pageSize: number;
}

export interface PageResult<T> {
  dataList: T[];
  count: number;
}

export interface InviteRecord {
  nickname: string;
  bindingTime: string;
}

export interface SponsorRecord {
  id: string;
  payType: "weChat" | "alipay";
  payStatus: number;
  amount: number;
  orderOn: string;
  updateTime: string;
}

export interface RebateRecord {
  nickname: string;
  amount: number;
  createTime: string;
}

export interface RebatePageResult extends PageResult<RebateRecord> {
  totalRebates: number;
}
