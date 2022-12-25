<script lang="ts" setup>
import { ref, defineProps } from "vue"
import { NCard, NElement, NH3, NText, NSpace } from "naive-ui"
import { parseTime } from "@/utils/Timer"
defineProps({
  data: String,
  title: String,
  date: String,
})
</script>

<template>
  <n-card content-style="padding: var(--gap)">
    <n-space justify="space-between">
      <n-h3>{{ title }}</n-h3>
      <n-text>
        {{ parseTime(<string>date) }}
      </n-text>
    </n-space>
    <n-element tag="div" class="main-container">
      <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <n-space vertical>
        <n-text class="esp">
          {{ data }}
        </n-text>
      </n-space>
    </n-element>
  </n-card>
</template>

<style lang="less" scoped>
img {
  width: 30%;
  height: 100%;
}
.main-container {
  display: flex;
  gap: var(--gap);
}
</style>
