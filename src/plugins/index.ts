import type { App } from "vue";
import { setupStore } from "@/store";
import {setupI18n} from "@/lang";
import { setupRouter } from "@/router";
import Antd from "ant-design-vue";

export default {
  install(app: App) {
    // 状态管理(store)
    setupStore(app);
    //国际化
    setupI18n(app);
    // 路由
    setupRouter(app);
    // 组件库
    app.use(Antd);
  },
};
