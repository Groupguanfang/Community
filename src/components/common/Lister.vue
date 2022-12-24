<script lang="ts" setup>
import { NListItem, NThing, NIcon, NSpace, NAvatar, NButton } from "naive-ui"
import {
  ThumbLike20Regular,
  ThumbDislike20Regular,
  Comment20Regular,
  Person20Regular,
} from "@vicons/fluent"
</script>

<script lang="ts">
export default {
  props: {
    title: String,
  },
}
</script>

<template>
  <n-list-item>
    <n-thing :title="title">
      <template #avatar>
        <n-avatar size="large" circle>
          <n-icon :size="25">
            <Person20Regular />
          </n-icon>
        </n-avatar>
      </template>
      <slot />
      <template #action>
        <n-space justify="space-between">
          <div class="left">
            <n-space>
              <n-button circle>
                <n-icon size="large">
                  <ThumbLike20Regular />
                </n-icon>
              </n-button>
              <n-button circle>
                <n-icon size="large">
                  <ThumbDislike20Regular />
                </n-icon>
              </n-button>
            </n-space>
          </div>
          <div class="right">
            <n-space>
              <n-button circle>
                <n-icon size="large">
                  <Comment20Regular />
                </n-icon>
              </n-button>
            </n-space>
          </div>
        </n-space>
      </template>
    </n-thing>
  </n-list-item>
</template>

<style lang="less" scoped></style>
