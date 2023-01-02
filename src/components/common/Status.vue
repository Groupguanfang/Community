<script lang="ts" setup>
import { defineProps } from "vue"
import { NTag } from "naive-ui"

defineProps(["status", "size"])
</script>

<template>
  <n-tag :size="size" :bordered="false" v-if="status === 'draft'"> 草稿 </n-tag>
  <n-tag
    :size="size"
    :bordered="false"
    v-if="status === 'check'"
    type="warning"
  >
    审核中
  </n-tag>
  <n-tag
    :size="size"
    :bordered="false"
    v-if="status === 'publish'"
    type="success"
  >
    已发布
  </n-tag>
</template>
