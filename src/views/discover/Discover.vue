<script setup>
import { NButton, NH1, NList, NSpace, NIcon } from "naive-ui"
import Footer from "@/components/common/Footer.vue"
import { ref, onMounted, type Ref } from "vue"
import { Get, GetUserInfoByGuest } from "lightning-community"
import { Add20Filled } from "@vicons/fluent"
import lister from "@/components/common/Lister.vue"

const data: Ref = ref([])

onMounted(async () => {
  const req = await Get("topic")
  for (let i = 0; i < req.data.length; i++) {
    const authorData = await GetUserInfoByGuest(req.data[i].author)
    req.data[i].authorData = authorData.data
  }
  data.value = req.data
})
</scrip>

<template>
  <div id="discover" class="margin">
    <Footer />
    <n-space align="center" justify="space-between">
      <n-h1 style="margin-top: 20px">发现</n-h1>
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
      </lister>
    </n-list>
  </div>
</template>

<style lang="less" scoped></style>
