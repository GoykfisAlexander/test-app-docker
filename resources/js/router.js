import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
export default new Router({
    mode: "history",
    routes: [
        {
            path: "/comments?page=1&sort=id&order=desc",
        },
    ],
});
