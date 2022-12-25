<script lang="ts" setup>
import { NNumberAnimation, NText, NSpace } from "naive-ui"
import { ref, defineProps } from "vue"
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Number,
    required: true,
  },
  vertical: Boolean,
})
const classData = ref({
  vertical: !props.vertical,
})
</script>

<template>
  <n-space :vertical="vertical" justify="center" align="center" :size="0">
    <n-text strong :depth="3">{{ title }}</n-text>
    <n-text strong class="data" :class="classData">
      <n-number-animation :from="0" :to="data"></n-number-animation>
    </n-text>
  </n-space>
</template>

<style lang="less" scoped>
.data {
  font-size: 20px;
}
.data.vertical {
  margin-left: 10px;
}
</style>
