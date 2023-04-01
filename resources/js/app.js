import Vue from "vue";
import router from "./router";
import store from "./views/store";
//Main pages
import App from "./views/app.vue";

const app = new Vue({
    router,
    store,
    el: "#app",
    components: { App },
});
