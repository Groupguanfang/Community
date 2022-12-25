<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCommon } from "@/stores/Common"
import { empty } from "@/utils/Empty"
import { Register, PostUserMailCode } from "lightning-community"
import { NSpace, NInput, NButton, NInputGroup, useMessage } from "naive-ui"
const message = useMessage()
const router = useRouter()
const common = useCommon()

const loading = ref(false)
const sendCodeLoading = ref(false)
const email = ref("")
const code = ref("")
const username = ref("")
const password = ref("")
const retryPassword = ref("")

/**
 * 发送电子邮箱验证码
 */
async function SendRegisterCode() {
  sendCodeLoading.value = true
  if (empty(email.value)) {
    message.error("请填写电子邮箱地址")
    sendCodeLoading.value = false
    return
  }
  const data = await PostUserMailCode(email.value)
  if (data.code === 200) {
    message.success(data.message)
  } else {
    message.error(data.message)
  }
  sendCodeLoading.value = false
}

/**
 * 注册
 */
async function RegisterAction() {
  loading.value = true
  if (
    empty(
      email.value,
      code.value,
      username.value,
      password.value,
      retryPassword.value,
    )
  ) {
    message.error("请填写所有项目")
    loading.value = false
    return
  }
  // @ts-ignore
  const data = await Register({
    username: username.value,
    password: password.value,
    email: email.value,
    code: code.value,
  })
  if (data.code === 200) {
    common.login(data.token)
    router.push("/user")
    message.success("注册成功")
  } else {
    message.error(data.message)
  }
  loading.value = false
}
</script>

<template>
  <n-space id="register" vertical class="margin">
    <div class="logo">
      <img src="//static.light.xhhzs.cn/public/logo.png" />
    </div>
    <n-input
      v-model:value="email"
      placeholder="请输入电子邮箱地址"
      size="large"
    />
    <n-input-group>
      <n-input placeholder="请输入六位验证码" v-model="code" />
      <n-button tertiary :loading="sendCodeLoading" @click="SendRegisterCode">
        发送验证码
      </n-button>
    </n-input-group>
    <n-input
      v-model:value="username"
      placeholder="请输入用户名,允许使用中文"
      size="large"
    />
    <n-input v-model:value="password" placeholder="请输入密码" size="large" />
    <n-input
      v-model:value="retryPassword"
      placeholder="再输一次QAQ"
      size="large"
    />
    <n-button block type="primary" :loading="loading" @click="RegisterAction">
      注册
    </n-button>
  </n-space>
</template>

<Style lang="less" scoped>
#register {
  margin-top: 50px;
  .logo {
    padding: 0 30px;
    img {
      width: 100%;
    }
  }
}
</Style>
