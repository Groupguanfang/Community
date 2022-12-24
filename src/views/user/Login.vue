<script lang="ts" setup>
import { ref } from "vue"
import { NInput, NSpace, NButton } from "naive-ui"
const username = ref("")
const password = ref("")
</script>

<template>
  <n-space class="margin" vertical>
    <div class="logo">
      <img class="logo" src="https://static.light.xhhzs.cn/public/logo.png" />
    </div>
    <n-input
      v-model:value="username"
      placeholder="请输入用户名或电子邮箱地址"
      size="large"
    />
    <n-input v-model:value="password" placeholder="请输入密码" size="large" />
    <n-button type="primary" block>登录</n-button>
  </n-space>
</template>

<Style lang="less" scoped>
.logo {
  width: 80%;
}
</Style>
