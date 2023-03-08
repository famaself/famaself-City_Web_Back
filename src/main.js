import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "./assets/gloable.css";
import request from "@/utils/request";

Vue.config.productionTip = false;

Vue.use(ElementUI, { size: "mini" });

Vue.prototype.request = request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//token检验函数
// router.beforeEach(function(to, from, next) {
//   if (to.meta.needLogin) {
//     //页面是否登录
//     if (localStorage.getItem("token")) {
//       //本地存储中是否有token(uid)数据
//       next(); //表示已经登录
//     } else {
//       //next可以传递一个路由对象作为参数 表示需要跳转到的页面
//       next({
//         name: "login"
//       });
//     }
//   } else {
//     //表示不需要登录
//     next(); //继续往后走
//   }
// });