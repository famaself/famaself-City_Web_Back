import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    // component: HomeView
    component: () => import("../views/Manage.vue"),
    redirect: "/home",
    meta: {
     // requireAuth: true,//实现认证后进入
    },
    children: [
      {
        path: "home",
        name: "", //首页
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "user",
        name: "用户管理",
        component: () => import("../views/User.vue"),
      },
      {
        path: "carousel",
        name: "轮播图管理",
        component: () => import("../views/CarouselView.vue"),
      },
      {
        path: "news",
        name: "新闻管理",
        component: () => import("../views/NewsView.vue"),
      }
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  next()  // 放行路由
})

export default router
