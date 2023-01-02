<script lang="tsx" setup>
import { ref, onMounted } from "vue"
import { useCommon } from "@/stores/Common"
import { useMedia } from "@/stores/Media"
import { GetUserMedia } from "lightning-community"
import { NCard, NSpace, NGrid, NGi } from "naive-ui"
const common = useCommon()
const media = useMedia()
const data = ref()
onMounted(async () => {
  const request = await GetUserMedia(common.user.token)
  data.value = request.data.files
  console.log(request.data.files)
})
</script>

<template>
  <n-space class="margin">
    <n-grid :cols="3">
      <n-gi v-for="(item,index) in data" :key="index" @click="media.push('/' + item.name)">
        <n-card>
          <n-space justify="center" align="center" vertical>
            <img v-if="item.type === 'F'" style="width:100%" src="//static.light.xhhzs.cn/public/1f4c1.svg" />
            {{ item.name }}
          </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </n-space>
</template>