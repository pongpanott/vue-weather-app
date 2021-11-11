import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Chakra, { CThemeProvider } from "@chakra-ui/vue";

Vue.use(Chakra);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(CThemeProvider, [h(App)]),
}).$mount("#app");
