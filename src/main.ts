import { createApp } from "vue";
import "./style.css";
import Antd from "ant-design-vue";
import "virtual:svg-icons-register";
import App from "./App.vue";
import "ant-design-vue/dist/reset.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "uno.css";
const app = createApp(App);
import setupPlugins from "@/plugins";
import router from "@/router";
import i18n from "@/lang/index";

app.component("SvgIcon", SvgIcon);
app.use(router);
app.use(setupPlugins);
app.use(i18n);
app.use(Antd);
app.mount("#app");
