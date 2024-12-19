import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { App } from "vue";
export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: { title: "home", icon: "homepage", affix: true },
      },
      {
        path: "userCenter",
        component: () => import("@/views/userCenter/index.vue"),
        name: "userCenter",
        meta: { title: "userCenter", icon: "homepage", affix: true },
      },
      {
        path: "sponsor",
        component: () =>
          import("@/views/userCenter/components/userMoney/sponsor.vue"),
        name: "sponsor",
        meta: { title: "sponsor", icon: "sponsor", affix: true },
      },
    ],
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App) {
  app.use(router);
}

export default router;
