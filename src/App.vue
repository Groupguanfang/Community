<script setup lang="ts">
import { computed } from "vue"
import {
  zhCN,
  NConfigProvider,
  useOsTheme,
  dateZhCN,
  darkTheme,
  NMessageProvider,
  NDialogProvider,
} from "naive-ui"
import ThemeConfig from "./theme"

const osThemeRef = useOsTheme()
const theme = computed(() => (osThemeRef.value === "dark" ? darkTheme : null))
</script>

<template>
  <n-config-provider
    :date-locale="dateZhCN"
    :locale="zhCN"
    :theme="theme"
    :theme-overrides="ThemeConfig"
  >
    <n-message-provider>
      <n-dialog-provider>
        <router-view />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
