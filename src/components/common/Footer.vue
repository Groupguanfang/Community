<script setup lang="ts">
import { useThemeVars, NSpace, NIcon } from "naive-ui"
import { useRoute } from "vue-router"
import {
  Home20Filled,
  Home20Regular,
  Iot20Filled,
  Iot20Regular,
  PersonCircle20Filled,
  PersonCircle20Regular,
} from "@vicons/fluent"
import Safari from "@/assets/appleIcon/Safari.vue"
import SafariFill from "@/assets/appleIcon/SafariFill.vue"
import Personal from "@/assets/appleIcon/Personal.vue"
import PersonalFill from "@/assets/appleIcon/PersonalFill.vue"
const route = useRoute()
const theme = useThemeVars()
</script>

<template>
  <n-space
    id="footer"
    justify="space-around"
    :style="{
      background: theme.bodyColor,
    }"
  >
    <n-icon :size="30" @click="$router.push('/')">
      <Home20Filled v-if="route.path === '/'" />
      <Home20Regular v-else />
    </n-icon>
    <n-icon :size="30" @click="$router.push('/discover')">
      <SafariFill v-if="route.path === '/discover'" />
      <Safari v-else />
    </n-icon>
    <n-icon :size="30" @click="$router.push('/user')">
      <PersonalFill v-if="route.path === '/user'" />
      <Personal v-else />
    </n-icon>
  </n-space>
</template>

<style lang="less" scoped>
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 8px;
  left: 0;
}
@media (prefers-color-scheme: dark) {
  #footer {
    color: #fff;
  }
}
</style>
