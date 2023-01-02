<script setup>
import { NTag, NButton, NH1, NList, NSpace, NIcon } from "naive-ui"
import Footer from "@/components/common/Footer.vue"
import { ref, onMounted } from "vue"
import { Get, GetUserInfoByGuest } from "lightning-community"
import { Add20Filled } from "@vicons/fluent"
import lister from "@/components/common/Lister.vue"
import { useCommon } from "@/stores/Common"
const common = useCommon()

const data = ref([])
const isLikeLoading = ref(true)

const getData = async () => {
  // 获取数据
  const req = await Get("topic", 999, 0, 1, common.user.token)
  for (let i = 0; i < req.data.length; i++) {
    const authorData = await GetUserInfoByGuest(req.data[i].author)
    req.data[i].authorData = authorData.data
    req.data[i].liked = JSON.parse(req.data[i].liked)
  }
  data.value = req.data
  return req
}

const onLike = async id => {
  isLikeLoading.value = true
  // 重新获取数据
  await getData()
  isLikeLoading.value = false
}

const mounted = async () => {
  await getData()
  // 初始化点赞数据
  for (let i = 0; i < data.value.length; i++) {
    await onLike(data.value[i].id)
  }
  isLikeLoading.value = false
}
onMounted(() => mounted())
</script>

<template>
  <div id="discover" class="margin">
    <Footer />
    <n-space align="center" justify="space-between">
      <n-h1
        @click="$router.push('/about')"
        style="margin-top: 20px; margin-bottom: 19.5px"
      >
        发现
      </n-h1>
      <n-button secondary type="primary" circle>
        <n-icon>
          <Add20Filled />
        </n-icon>
      </n-button>
    </n-space>
    <n-list bordered clickable hoverable>
      <lister
        v-for="(item, index) in data"
        :key="index"
        :title="item.authorData.name"
        :likeCount="item.liked.length"
        :id="item.id"
        @onLike="onLike(item.id)"
        :isLike="item.islike"
        :likeLoading="isLikeLoading"
      >
        {{ item.data }}
        <template #description>
          <n-space>
            <n-tag :bordered="false" type="primary" size="small">
              Lv {{ item.authorData.level }}
            </n-tag>
            <n-tag
              v-if="item.authorData.level == 10"
              type="warning"
              :bordered="false"
              size="small"
            >
              管理员
            </n-tag>
          </n-space>
        </template>
      </lister>
    </n-list>
  </div>
</template>

<style lang="less" scoped></style>
