import { createApp } from "vue";
import "@unocss/reset/normalize.css";
import "virtual:svg-icons-register";
import App from "./App.vue";
import setupPlugins from "@/plugins";
import "ant-design-vue/dist/reset.css";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "uno.css";
import "@/styles/index.scss";

const app = createApp(App);

app.component("SvgIcon", SvgIcon);
app.use(setupPlugins);
app.mount("#app");
