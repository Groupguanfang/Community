<script setup>
import { NButton, NH1, NList, NSpace, NIcon } from "naive-ui"
import Footer from "@/components/common/Footer.vue"
import { ref, onMounted } from "vue"
import { Get, GetUserInfoByGuest } from "lightning-community"
import { Add20Filled } from "@vicons/fluent"
import lister from "@/components/common/Lister.vue"

const data = ref([])

onMounted(async () => {
  const req = await Get("topic")
  for (let i = 0; i < req.data.length; i++) {
    const authorData = await GetUserInfoByGuest(req.data[i].author)
    req.data[i].authorData = authorData.data
  }
  data.value = req.data
})
</script>

<template>
  <div id="discover" class="margin">
    <Footer />
    <n-space align="center" justify="space-between">
      <n-h1 @click="$router.push('/about')" style="margin-top: 20px; margin-bottom: 19.5px">发现</n-h1>
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
      >
        {{ item.data }}
        <template #description> 管理员 </template>
      </lister>
    </n-list>
  </div>
</template>

<style lang="less" scoped></style>
