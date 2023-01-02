<script lang="ts" setup>
import { defineProps } from "vue"
import { NSpace, NIcon, NText } from "naive-ui"
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <n-space :size="0" vertical align="center" justify="center">
    <n-icon :size="40">
      <slot name="icon"></slot>
    </n-icon>
    <n-text strong>{{ title }}</n-text>
  </n-space>
</template>
