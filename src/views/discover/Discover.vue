<script lang="ts" setup>
import { NH1, NList, NListItem, NThing, NSpace, NButton, NIcon } from "naive-ui"
import Footer from "@/components/common/Footer.vue"
import { ref, onMounted, type Ref } from "vue"
import { Get, GetUserInfoByGuest } from "lightning-community"
import {
  ThumbLike20Regular,
  ThumbDislike20Regular,
  Comment20Regular,
} from "@vicons/fluent"

const data: Ref<Array<any>> = ref([])
onMounted(async () => {
  const req = await Get("topic")
  for (let i = 0; i < data.value.length; i++) {
    const authorData = await GetUserInfoByGuest(req.data[i].author)
    console.log(authorData.data)
    req.data[i].authorData = authorData.data
  }
  data.value = <Array<any>>req.data
  console.log(req.data)
})
</script>

<template>
  <div id="discover" class="margin">
    <Footer />
    <n-h1 style="margin-top: 20px">发现</n-h1>
    <n-list bordered clickable hoverable>
      <n-list-item v-for="(item, index) in data" :key="index">
        <n-thing :description="item.data">
          <template #action>
            <n-space justify="space-between">
              <div class="left">
                <n-space>
                  <n-button circle>
                    <n-icon size="large">
                      <ThumbLike20Regular />
                    </n-icon>
                  </n-button>
                  <n-button circle>
                    <n-icon size="large">
                      <ThumbDislike20Regular />
                    </n-icon>
                  </n-button>
                </n-space>
              </div>
              <div class="right">
                <n-space>
                  <n-button circle>
                    <n-icon size="large">
                      <Comment20Regular />
                    </n-icon>
                  </n-button>
                </n-space>
              </div>
            </n-space>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<style lang="less" scoped></style>
