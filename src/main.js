import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Chakra, { CThemeProvider } from "@chakra-ui/vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Chakra);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(CThemeProvider, [h(App)]),
}).$mount("#app");
