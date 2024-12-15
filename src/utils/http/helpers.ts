import { useAuthStore } from "@/store";
import { Modal, notification } from "ant-design-vue";
import { createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
let isConfirming = false;
export function resolveResError(
  code: number,
  message: string | undefined,
  needTip = true
) {
  switch (code) {
    case 401:
      if (isConfirming || !needTip) return;
      isConfirming = true;
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: `登入已過期，是否重新登入？`,
        onOk() {
          useAuthStore().logout();
          isConfirming = false;
          notification["success"]({
            message: "消息",
            description: "已退出登入",
          });
        },
        onCancel() {
          isConfirming = false;
        },
      });
      return false;
    case 11007:
    case 11008:
      if (isConfirming || !needTip) return;
      isConfirming = true;
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: `${message}，是否重新登入？`,
        onOk() {
          useAuthStore().logout();
          isConfirming = false;
          notification["success"]({
            message: "消息",
            description: "已退出登入",
          });
        },
        onCancel() {
          isConfirming = false;
        },
      });
      return false;
    case 203:
      if (isConfirming || !needTip) return;
      isConfirming = true;
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: `登入已過期，是否重新登入？`,
        onOk() {
          useAuthStore().logout();
          isConfirming = false;
          notification["success"]({
            message: "消息",
            description: "已退出登入",
          });
        },
        onCancel() {
          isConfirming = false;
        },
      });
      return false;
    case 403:
      message = "請求被拒絕";
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
      message: "错误",
      description: message,
    });
  return message;
}
