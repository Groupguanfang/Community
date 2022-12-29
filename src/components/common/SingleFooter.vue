<script setup lang="ts">
import { NIcon, NSpace, NElement, NInput } from "naive-ui"
import {
  Heart20Filled,
  IosArrowLtr24Filled,
  Heart20Regular,
  Comment20Regular,
} from "@vicons/fluent"
import { ref } from "vue"
const isLike = ref(false)
const like = () => {}
</script>

<template>
  <div id="bottom-bar">
    <div class="left">
      <n-icon size="large" @click="$router.go(-1)">
        <IosArrowLtr24Filled />
      </n-icon>
    </div>
    <div class="right">
      <n-icon size="25">
        <Heart20Filled v-if="isLike" @click="like" />
        <Heart20Regular v-if="!isLike" @click="like" />
      </n-icon>
      <n-input :disabled="true" size="large" round placeholder="评论区暂未开放">
        <template #prefix>
          <n-icon :component="Comment20Regular" />
        </template>
      </n-input>
    </div>
  </div>
</template>

<style lang="less" scoped>
#bottom-bar {
  color: var(--color);
  border-top: var(--border);
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #ffffff01;
  z-index: 999;
  backdrop-filter: blur(70px);
  -webkit-backdrop-filter: blur(70px);
  .left,
  .right {
    align-items: center;
    display: flex;
    margin: 5px;
    margin-left: var(--gap);
    margin-right: var(--gap);
  }
  .right {
    width: 70%;
    gap: 14px;
  }
}
@media (prefers-color-scheme: dark) {
  #bottom-bar {
    background: #10141401;
    backdrop-filter: blur(70px);
    -webkit-backdrop-filter: blur(70px);
  }
}
</style>
