<script lang="ts" setup>
import { ref } from "vue"
import { NInput, NSpace, NButton, useMessage } from "naive-ui"
import { Login } from "lightning-community"
import { useCommon } from "@/stores/Common"
import { useRouter } from "vue-router"
import LoginRegister from "@/components/user/Login&Register.vue"
const message = useMessage()
const common = useCommon()
const router = useRouter()

const username = ref("")
const password = ref("")
const loading = ref(false)

// 判断是否已登录，如果已经登录，则跳转到user页面
if (JSON.stringify(common.user) !== "{}") {
  message.warning("您已登录，请勿重新返回登录页")
  router.push("/user")
}

async function LoginAction() {
  loading.value = true
  const data = await Login(username.value, password.value)
  if (data.code !== 200) {
    message.error(data.message)
  } else {
    common.login(<object>data.data)
    message.success(data.message)
    router.push("/user")
  }
  loading.value = false
}
</script>

<template>
  <n-space id="login" class="margin" vertical>
    <div class="logo">
      <img src="https://static.light.xhhzs.cn/public/logo.png" />
    </div>
    <n-input
      v-model:value="username"
      placeholder="请输入用户名或电子邮箱地址"
      size="large"
    />
    <n-input
      type="password"
      v-model:value="password"
      placeholder="请输入密码"
      size="large"
    />
    <n-button
      :loading="loading"
      size="large"
      type="primary"
      block
      @click="LoginAction"
    >
      登录
    </n-button>
    <LoginRegister />
  </n-space>
</template>

<Style lang="less" scoped>
#login {
  margin-top: 50px;
  .logo {
    padding: 0 30px;
    img {
      width: 100%;
    }
  }
}
</Style>
