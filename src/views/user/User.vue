<script setup lang="ts">
import Footer from "@/components/common/Footer.vue"
import Skeleton from "@/skeletons/UserSkeleton.vue"
import {
  NButton,
  NSpace,
  useMessage,
  useDialog,
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
  NCard,
} from "naive-ui"
import {
  MoreHorizontal16Filled,
  Settings20Regular,
  Delete20Regular,
  SignOut24Regular,
  Add16Filled,
} from "@vicons/fluent"
import {
  GetUserInfo,
  GetUserPost,
  DeletePost,
  GetUserTopic,
} from "lightning-community"
import { useCommon } from "@/stores/Common"
import { useRouter } from "vue-router"
import { onMounted, ref, type Ref } from "vue"
import Avatar from "@/assets/appleIcon/Avatar.vue"
import ActionButton from "@/components/user/ActionButton.vue"
import StaticNumber from "@/components/user/StaticNumber.vue"
import MyPostItem from "@/components/user/MyPostItem.vue"
import Status from "@/components/common/Status.vue"
const common = useCommon()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()

// 如果未登录则跳转到登录页
if (JSON.stringify(common.user) === "{}") {
  message.warning("请先登录")
  router.push("/user/login")
}

const loading = ref(true)
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
    id: number
  }>
> = ref([])
const topics: Ref<
  Array<{
    data: string
    date: string
  }>
> = ref([])
onMounted(async () => {
  const request = await GetUserInfo(<string>common.user.token)
  const postRequest = await GetUserPost(
    <number>common.user.id,
    common.user.token,
  )
  const topicRequest = await GetUserTopic(
    <number>common.user.id,
    common.user.token,
  )
  if (request.code !== 500) {
    // TS知识不够懒得改了老子直接ignore
    // @ts-ignore
    info.value = request
    // @ts-ignore
    posts.value = postRequest.data
    topics.value = topicRequest.data
    loading.value = false
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

// 文章tab
const tabsValue = ref("文章")
function deleteConfim(id: string | number) {
  let d = dialog.warning({
    title: "警告",
    content: "确认删除该文章？请三思！",
    positiveText: "确定",
    negativeText: "手滑了",
    onPositiveClick: (): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        d.loading = true
        const deleter = await DeletePost(common.user.token, "post", id)
        if (deleter.code === 200) {
          const newData = await GetUserPost(
            <number>common.user.id,
            common.user.token,
          )
          if (newData.code !== 500) {
            // TS知识不够懒得改了老子直接ignore
            // @ts-ignore
            posts.value = newData.data
          } else {
            message.error(newData.message)
            common.logout()
            router.push("/")
          }
          message.success(deleter.message)
          resolve(deleter)
        } else {
          message.error(deleter.message)
          reject(deleter)
        }
      })
    },
  })
}

// 帖子tab
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
              <SignOut24Regular />
            </template>
          </ActionButton>
        </n-gi>
      </n-grid>
      <n-button
        block
        ghost
        :bordered="false"
        size="large"
        class="no-radius"
        @click="isOpen = false"
      >
        取消
      </n-button>
    </n-drawer>

    <Skeleton v-if="loading" />
    <!-- 主要内容 -->
    <n-thing v-if="!loading" :title="info.data.name">
      <template #avatar>
        <n-avatar :size="50">
          <n-icon :size="25">
            <Avatar />
          </n-icon>
        </n-avatar>
      </template>
      <template #header-extra>
        <n-button size="large" text @click="isOpen = true">
          <n-icon :size="20">
            <MoreHorizontal16Filled />
          </n-icon>
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

    <n-space v-if="!loading" justify="space-around">
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

    <n-tabs v-if="!loading" type="segment" v-model:value="tabsValue">
      <n-tab-pane name="文章">
        <n-button
          dashed
          block
          class="newDraft"
          @click="$router.push('/user/newdraft')"
        >
          <template #icon>
            <n-icon :component="Add16Filled" />
          </template>
          新建
        </n-button>

        <n-space size="large" vertical style="margin-bottom: 30px">
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
              <n-button
                size="small"
                type="error"
                circle
                @click="deleteConfim(item.id)"
              >
                <template #icon>
                  <n-icon>
                    <Delete20Regular />
                  </n-icon>
                </template>
              </n-button>
            </n-space>
          </MyPostItem>
        </n-space>
        <n-empty v-if="posts.length === 0" />
      </n-tab-pane>
      <n-tab-pane name="帖子">
        <n-space>
          <n-card v-for="(item, index) in topics" :key="index">
            {{ item.data }}
            {{ item.date }}
          </n-card>
        </n-space>
        <n-empty v-if="topics.length === 0" />
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

<style lang="less" scoped>
.newDraft {
  margin-bottom: 12px;
}
</style>
