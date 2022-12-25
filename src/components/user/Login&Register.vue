<script setup lang="ts">
import { NButton } from "naive-ui"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()

let name = "登录"
if (route.path === "/user/login") {
  name = "注册"
}

function push() {
  if (route.path === "/user/login") {
    router.push("/user/register")
  } else {
    router.push("/user/login")
  }
}
</script>

<template>
  <div style="display: flex; gap: var(--gap)">
    <n-button block style="width: 29.3%" @click="push">{{ name }}</n-button>
    <n-button block style="width: 29.3%" @click="$router.push('/')">
      首页
    </n-button>
    <n-button block style="width: 29.3%">找回密码</n-button>
  </div>
</template>
