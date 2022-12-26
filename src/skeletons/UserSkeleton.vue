<script lang="ts" setup>
import { NSpace, NSkeleton } from "naive-ui"
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-skeleton animated :height="50" :width="50" size="large" round />
      <n-space vertical>
        <n-space vertical>
          <n-skeleton :height="15" animated :width="100" />
          <n-space>
            <n-skeleton :height="18" :width="45" />
            <n-skeleton :height="18" :width="45" />
          </n-space>
        </n-space>
        <n-skeleton :width="200" />
      </n-space>
    </n-space>
    <n-space justify="space-around">
      <n-space vertical align="center">
        <n-skeleton :width="50" />
        <n-skeleton :height="25" :width="20" />
      </n-space>
      <n-space vertical align="center">
        <n-skeleton :width="50" />
        <n-skeleton :height="25" :width="20" />
      </n-space>
      <n-space vertical align="center">
        <n-skeleton :width="50" />
        <n-skeleton :height="25" :width="20" />
      </n-space>
    </n-space>

    <n-skeleton round :height="30" width="100%" />
    <n-skeleton :height="100" width="100%" />
    <n-skeleton :height="100" width="100%" />
  </n-space>
</template>
