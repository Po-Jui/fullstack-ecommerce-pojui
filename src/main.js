import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Loading from "vue3-loading-overlay";
import $ from "jquery";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
// aos
import AOS from "aos";
import "aos/dist/aos.css";
import App from "./App.vue";
import router from "./router";
// 全域註冊千分號跟日期轉換
import { currency, date } from "./methods/filters";
// import $httpMessageState from "./methods/pushMessageState";
import $emitter from "./methods/emitter";
// 引入SweetAlert及其附帶的css
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

window.$ = $;

const app = createApp(App);

app.config.globalProperties.$filters = {
  date,
  currency,
};

// 正常來說不建議太多方法掛 Global，這裡可以使用 provide 來處理
app.config.globalProperties.$emitter = $emitter;

app.use(VueAxios, axios);
app.use(router);
app.use(VueSweetalert2); // 在app中註冊使用SweetAlert
app.use(VueAwesomeSwiper);
app.use(vuetify);
app.component("Loading", Loading);
app.mount("#app");

AOS.init({
  offset: 120,
  once: true,
  duration: 1500,
});
