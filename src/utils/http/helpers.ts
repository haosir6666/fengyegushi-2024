import { useAuthStore, useAppStore } from "@/store";
import { notification } from "ant-design-vue";
let isConfirming = false;
export function resolveResError(
  code: number | string,
  message: string | undefined,
  needTip = true
) {
  switch (code) {
    case 401:
    case 402:
    case 410:
      if (isConfirming || !needTip) return;
      isConfirming = true;
      notification["warning"]({
        message: "提示",
        description: code === 410 ? `請先登錄` : `登入已過期，請重新登入？`,
      });
      useAuthStore().logout();
      useAppStore().handleLoginBox(true);
      isConfirming = false;
      return false;
    case 403:
      message = "請求被拒絕";
      break;
    case 429:
      message = "係統繁忙，請稍後重試";
      break;
    case -999:
      message = "係統維護中";
      break;
    case 99:
      message = "網路繁忙或數據發生變更，請刷新後重試";
      break;
    case 404:
      message = "請求資源或接口不存在";
      break;
    case 500:
      message = "服務器發生異常";
      break;
    case 205:
      message = "冇有此權限";
      break;
    default:
      message = message ?? `【${code}】: 未知異常!`;
      break;
  }
  needTip &&
    notification["error"]({
      message: "錯誤",
      description: message,
    });
  return message;
}
