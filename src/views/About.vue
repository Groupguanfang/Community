<script lang="tsx" setup>
import { ref } from "vue"
import { NCard, NGrid, NGi, NH3, NNumberAnimation, NH2, NH1, NText, NSpace } from "naive-ui"
import { GetPV } from "lightning-community"

const count = ref()
const mounted = (async () => {
  const pv = await GetPV()
  count.value = parseInt(pv.data)
})()
</script>

<template>
  <n-space class="margin" vertical>
    <n-space vertical align="center" class="logo-contain">
      <img class="logo" src="//static.light.xhhzs.cn/public/E13AA1C3-D46B-4A94-9539-FF910D937A03.jpeg" alt="logo" />
      <n-h1 style="margin:0">心电社区</n-h1>
      <n-text>
        本站已被访问
          <n-number-animation :from="0" :to="count" />
        次
      </n-text>
    </n-space>
    <n-space vertical>
      <n-h2 prefix="bar">Using</n-h2>
      <n-grid :x-gap="8" :y-gap="12" :cols="2">
        <n-gi>
          <n-card title="Nai">
            <n-text depth="3">Base Node</n-text>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card title="Vue">
            <n-text depth="3">Progressive</n-text>
          </n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </n-space>
</template>

<style lang="less" scoped>
.logo-contain {
  padding: 10px 50px;
}
.logo {
  border-radius: 18%;
  width: 100%;
}
</style>