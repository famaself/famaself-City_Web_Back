import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    // component: HomeView
    meta: {
      requireAuth: true,//实现认证后进入
    },
    component: () => import("../views/Manage.vue"),
    children: [
      {
        path: "home",
        name: "", //首页
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "user",
        name: "用户管理",
        meta: {
          requireAuth: true,//实现认证后进入
        },
        component: () => import("../views/User.vue"),
      },
      {
        path: "carousel",
        name: "轮播图管理",
        meta: {
          requireAuth: true,//实现认证后进入
        },
        component: () => import("../views/CarouselView.vue"),
      },
      {
        path: "news",
        name: "新闻管理",
        meta: {
          requireAuth: true,//实现认证后进入
        },
        component: () => import("../views/NewsView.vue"),
      },
      {
        path: "check",
        name: "侵权检测",
        meta: {
          requireAuth: true,//实现认证后进入
        },
        component: () => import("../views/CheckRight.vue"),
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
    meta: {
      requireAuth: true,//实现认证后进入
    },
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


router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (sessionStorage.getItem("token")) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
          })
      }
  }
  else {
      next();
  }
})

export default router
