import { createRouter, createWebHistory } from "vue-router"
import { createDiscreteApi, darkTheme } from "naive-ui"
const { message, loadingBar } = createDiscreteApi(["message", "loadingBar"], {
  configProviderProps: {
    theme: darkTheme,
  },
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: {
        title: "主页",
      },
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/user/User.vue"),
      meta: {
        title: "用户中心",
      },
    },
    {
      path: "/user/newdraft",
      name: "newdraft",
      component: () => import("@/views/user/NewDraft.vue"),
      meta: {
        title: "新建文章草稿",
      },
    },
    {
      path: "/discover",
      name: "discover",
      component: () => import("@/views/discover/Discover.vue"),
      meta: {
        title: "发现",
      },
    },
    {
      path: "/apps/:e",
      name: "bilibili",
      component: () => import("@/views/apps/bilibili.vue"),
      meta: {
        title: "腕上系列",
      },
    },
    {
      path: "/user/login",
      name: "login",
      component: () => import("@/views/user/Login.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/user/register",
      name: "register",
      component: () => import("@/views/user/Register.vue"),
      meta: {
        title: "注册",
      },
    },
    {
      path: "/post/:id",
      name: "postsingle",
      component: () => import("@/views/PostSingle.vue"),
      meta: {
        title: "文章详情",
      },
    },
  ],
})

router.beforeEach(to => {
  loadingBar.start()
  if (to.meta.title) document.title = to.meta.title + " - 心电社区"
})

router.afterEach((to, from, failure) => {
  if (failure) {
    loadingBar.error()
    if (to.path == from.path) {
      message.error("您当前正处于此页面")
    }
  } else {
    loadingBar.finish()
  }
})

export default router
