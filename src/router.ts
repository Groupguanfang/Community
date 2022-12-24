import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/user/User.vue"),
    },
    {
      path: "/user/newdraft",
      name: "newdraft",
      component: () => import("@/views/user/NewDraft.vue"),
    },
    {
      path: "/discover",
      name: "discover",
      component: () => import("@/views/discover/Discover.vue"),
    },
    {
      path: "/apps/:e",
      name: "bilibili",
      component: () => import("@/views/apps/bilibili.vue"),
    },
  ],
})

router.beforeEach(() => {})

export default router
