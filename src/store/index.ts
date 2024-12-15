import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia();

// 全局注册 store
export function setupStore(app: App) {
  store.use(piniaPluginPersistedstate);
  app.use(store);
}

export * from "./modules/test";
export * from "./modules/app";
export * from "./modules/auth";
export { store };
