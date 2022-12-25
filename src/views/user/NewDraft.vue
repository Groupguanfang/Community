<script setup lang="tsx">
import { h, ref } from "vue"
import { renderToString } from "vue/server-renderer"
import { NA, NSpace, NInput } from "naive-ui"
import MdEditor from "md-editor-v3"
import "md-editor-v3/lib/style.css"
const editor = MdEditor
const title = ref("")
const text = ref("")
</script>

<template>
  <n-space vertical>
    <n-input
      v-model:value="title"
      size="large"
      placeholder="请输入文章标题"
      perview
    />
    <editor v-model="text" />
  </n-space>
</template>
