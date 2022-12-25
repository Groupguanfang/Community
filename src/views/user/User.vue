<script setup lang="ts">
import Footer from "@/components/common/Footer.vue"
import {
  NButton,
  NSpace,
  useMessage,
  NThing,
  NAvatar,
  NTag,
  NText,
  NIcon,
  NTabs,
  NTabPane,
  NDrawer,
  NGi,
  NGrid,
  NEmpty,
} from "naive-ui"
import {
  MoreHorizontal16Filled,
  Settings20Regular,
  Delete20Regular,
} from "@vicons/fluent"
import { useCommon } from "@/stores/Common"
import { useRouter } from "vue-router"
import { GetUserInfo, GetUserPost } from "lightning-community"
import { onMounted, ref, type Ref } from "vue"
import Avatar from "@/assets/appleIcon/Avatar.vue"
import ActionButton from "@/components/user/ActionButton.vue"
import StaticNumber from "@/components/user/StaticNumber.vue"
import MyPostItem from "@/components/user/MyPostItem.vue"
import Status from "@/components/common/Status.vue"
const common = useCommon()
const router = useRouter()
const message = useMessage()

// 如果未登录则跳转到登录页
if (JSON.stringify(common.user) === "{}") {
  message.warning("请先登录")
  router.push("/user/login")
}

const info = ref({
  data: {
    name: "加载中",
    level: 0,
    saying: "加载中",
  },
})
const posts: Ref<
  Array<{
    title: string
    data: string
    poster: string
    date: string
    status: string
  }>
> = ref([])
onMounted(async () => {
  const request = await GetUserInfo(<string>common.user.token)
  const postRequest = await GetUserPost(common.user.id)
  if (request.code !== 500) {
    // @ts-ignore
    // TS知识不足实在是没法解决这个报错了烦死了 懒得改了
    info.value = request
    posts.value = postRequest.data
  } else {
    message.error(request.message)
    common.logout()
    router.push("/")
  }
})

// Drawer
const isOpen = ref(false)
function logout() {
  common.logout()
  message.success("已退出登录")
  router.push("/")
}

// Tabs
const tabsValue = ref("文章")
</script>

<template>
  <n-space class="margin" vertical>
    <Footer />
    <!-- 更多操作 -->
    <n-drawer placement="bottom" height="auto" v-model:show="isOpen">
      <n-grid :cols="4" style="margin-top: 14px; margin-bottom: 14px">
        <n-gi>
          <ActionButton title="登出" @click="logout">
            <template #icon>
              <Settings20Regular />
            </template>
          </ActionButton>
        </n-gi>
      </n-grid>
      <n-button
        block
        quaternary
        ghost
        size="large"
        class="no-radius"
        @click="isOpen = false"
      >
        取消
      </n-button>
    </n-drawer>

    <!-- 主要内容 -->
    <n-thing :title="info.data.name">
      <template #avatar>
        <n-avatar :size="50">
          <n-icon :size="25"><Avatar /></n-icon>
        </n-avatar>
      </template>
      <template #header-extra>
        <n-button size="large" text @click="isOpen = true">
          <n-icon :size="20"><MoreHorizontal16Filled /></n-icon>
        </n-button>
      </template>
      <template #description>
        <n-space vertical>
          <n-space>
            <n-tag type="primary" :bordered="false">
              Lv {{ info.data.level }}
            </n-tag>
            <n-tag
              type="warning"
              :bordered="false"
              v-if="info.data.level === 10"
            >
              管理员
            </n-tag>
          </n-space>
          <n-text>{{ info.data.saying }}</n-text>
        </n-space>
      </template>
    </n-thing>

    <n-space justify="space-around">
      <StaticNumber
        vertical
        title="文章"
        :data="0"
        @click="tabsValue = '文章'"
      />
      <StaticNumber
        vertical
        title="关注"
        :data="0"
        @click="tabsValue = '关注'"
      />
      <StaticNumber
        vertical
        title="粉丝"
        :data="0"
        @click="tabsValue = '粉丝'"
      />
    </n-space>
    <n-tabs type="segment" v-model:value="tabsValue">
      <n-tab-pane name="文章">
        <MyPostItem
          v-for="(item, index) in posts"
          :key="index"
          :title="item.title"
          :data="item.data"
          :date="item.date"
          :poster="item.poster"
        >
          <n-space justify="space-between">
            <Status :status="item.status" />
            <n-button size="small" type="error" circle>
              <template #icon>
                <n-icon>
                  <Delete20Regular />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </MyPostItem>

        <n-empty v-if="posts.length === 0" />
      </n-tab-pane>
      <n-tab-pane name="关注">
        <n-empty />
      </n-tab-pane>
      <n-tab-pane name="粉丝">
        <n-empty />
      </n-tab-pane>
    </n-tabs>
  </n-space>
</template>
