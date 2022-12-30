<script lang="ts" setup>
import { NListItem, NThing, NIcon, NSpace, NAvatar, NButton, NNumberAnimation } from "naive-ui"
import {
  ThumbLike20Regular,
  ThumbLike20Filled,
  Comment20Regular,
  Person20Regular,
} from "@vicons/fluent"
</script>

<script lang="ts">
export default {
  props: {
    title: String,
    description: String,
    isLike: Boolean,
    likeCount: {
      type: Number,
      default: () => 0
    }
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
      <template #description>
        <slot name="description" />
      </template>
      <slot />
      <template #action>
        <n-space justify="space-between">
          <div class="left">
            <n-space>
              <n-button :type="isLike ? 'primary' : 'default'" size="small" round>
                <template #icon>
                  <n-icon size="medium">
                    <ThumbLike20Regular />
                  </n-icon>
                </template>
                <n-number-animation :from="0" :to="likeCount" />
              </n-button>
            </n-space>
          </div>
          <div class="right">
            <n-space>
              <n-button size="small" circle>
                <n-icon>
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
