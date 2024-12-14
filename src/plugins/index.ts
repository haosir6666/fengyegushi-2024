import type { App } from "vue";

import { setupStore } from "@/store";

export default {
  install(app: App<Element>) {
    // 状态管理(store)
    setupStore(app);
  },
};
