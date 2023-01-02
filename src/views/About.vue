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
      <n-h2 class="e" prefix="bar">地基</n-h2>
      <n-grid :x-gap="8" :y-gap="8" :cols="2">
        <n-gi>
          <n-card embedded size="small" title="Nai">
            <n-text depth="3">基于Express</n-text>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card embedded size="small" title="Vue">
            <n-text depth="3">渐进响应式</n-text>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card embedded size="small" title="Naive UI">
            <n-text depth="3">有点意思</n-text>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card embedded size="small" title="Tencent Cloud">
            <n-text depth="3">基础服务</n-text>
          </n-card>
        </n-gi>
      </n-grid>
      
      <n-h2 class="e" prefix="bar">股东们</n-h2>
      <n-grid :x-gap="8" :y-gap="8" :cols="2">
        <n-gi>
          <n-card embedded size="small" title="闪电狮">
            <n-text depth="3">
              腕上系列
            </n-text>
          </n-card>
        </n-gi>
      </n-grid>
      <n-h2 class="e" prefix="bar">
        包工头们
      </n-h2>
      <n-grid :x-gap="8" :y-gap="8" :cols="2">
        <n-gi>
          <n-card embedded size="small" title="Zero">
            <n-text depth="3">
              心电社区
            </n-text>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card embedded size="small" title="邱璇洛">
            <n-text depth="3">
              心电社区
            </n-text>
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
.e {
  margin-bottom: 5px;
  margin-top: 20px;
}
</style>