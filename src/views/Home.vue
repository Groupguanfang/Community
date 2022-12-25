<script lang="ts" setup>
import { ref } from "vue"
import { GetAnnouncement } from "lightning-community"
import { NSpace, NH1, NCarousel, NText, NGrid, NGi, NAlert } from "naive-ui"
import Footer from "@/components/common/Footer.vue"

const notice = ref("公告正在奋力加载中...")
;(async () => {
  const request = await GetAnnouncement()
  notice.value = request.data
})()
</script>

<template>
  <n-space id="home" class="margin" vertical>
    <n-space vertical :size="0">
      <Footer />
      <n-text strong depth="3">
        {{ new Date().getMonth() }}月{{ new Date().getDate() }}日
      </n-text>
      <n-h1 strong style="margin-top: 0; margin-bottom: 0; font-weight: bold">
        心电社区
      </n-h1>
    </n-space>
    <n-carousel draggable show-arrow autoplay class="ppt">
      <img
        class="carousel-img"
        src="//static.light.xhhzs.cn/public/poster.jpeg"
      />
      <img
        class="carousel-img"
        src="//naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      />
      <img
        class="carousel-img"
        src="//naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      />
    </n-carousel>

    <n-alert type="info" :title="notice" />

    <n-grid :x-gap="35" class="App" :cols="4">
      <n-gi @click="$router.push('/apps/bilibili')">
        <n-space :size="0" justify="center">
          <img src="//static.light.xhhzs.cn/public/bili.png" />
          <n-text>B站</n-text>
        </n-space>
      </n-gi>
      <n-gi>
        <n-space :size="0" justify="center">
          <img src="//static.light.xhhzs.cn/public/novel.png" />
          <n-text>小说</n-text>
        </n-space>
      </n-gi>
      <n-gi>
        <n-space :size="0" justify="center">
          <img src="//static.light.xhhzs.cn/public/news.png" />
          <n-text>资讯</n-text>
        </n-space>
      </n-gi>
      <n-gi>
        <n-space :size="0" justify="center">
          <img src="//static.light.xhhzs.cn/public/netease.jpeg" />
          <n-text>音乐</n-text>
        </n-space>
      </n-gi>
    </n-grid>
  </n-space>
</template>

<style lang="less" scoped>
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.ppt {
  border-radius: 9px;
  box-shadow: var(--shadow);
  transition: var(--tranOut);
}
.ppt:active {
  box-shadow: none;
  transition: var(--tranIn);
  transform: scale(0.95);
}
.App {
  margin-top: 10px;
  img {
    border-radius: 9px;
    width: 100%;
    box-shadow: var(--shadow);
    transition: var(--tranOut);
  }
  img:active {
    transition: ease 0.2s;
    box-shadow: none;
    transition: var(--tranIn);
    transform: scale(0.9);
  }
}
</style>
