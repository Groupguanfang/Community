<script lang="ts">
import { useCommon } from "@/stores/Common"
import { Like } from "lightning-community"
import { useMessage, NListItem, NThing, NIcon, NSpace, NAvatar, NButton, NNumberAnimation } from "naive-ui"
import {
  ThumbLike20Regular,
  ThumbLike20Filled,
  Comment20Regular,
  Person20Regular,
} from "@vicons/fluent"
export default {
  props: {
    title: String,
    description: String,
    isLike: Boolean,
    likeCount: {
      type: Number,
      default: () => 0
    },
    id: {
      required: true,
      type: Number
    }
  },
  setup() {
    const common = useCommon()
    const message = useMessage()
    return {
      common, message
    }
  },
  methods: {
    async likeAction() {
      const request = await Like(
        this.common.user.token,
        "topic",
        this.id,
        this.isLike ? "dislike" : "like"
      )
      this.message.success(request.message)
      this.$emit('onLike')
      console.log(request)
    }
  },
  components: { ThumbLike20Regular, ThumbLike20Filled, Comment20Regular, Person20Regular, NListItem, NThing, NIcon, NSpace, NAvatar, NButton, NNumberAnimation }
}
</script>

<template>
  <n-list-item>
    <n-thing :title="title">
      <template #avatar>
        <n-avatar size="large" circle>
          <n-icon :size="25">
            <Person20Regular />
          </n-icon>
        </n-avatar>
      </template>
      <template #description>
        <slot name="description" />
      </template>
      <slot />
      <template #action>
        <n-space justify="space-between">
          <div class="left">
            <n-space>
              <n-button @click="likeAction" :type="isLike ? 'primary' : 'default'" size="small" round>
                <template #icon>
                  <n-icon size="medium">
                    <ThumbLike20Regular />
                  </n-icon>
                </template>
                <n-number-animation :from="0" :to="likeCount" />
              </n-button>
            </n-space>
          </div>
          <div class="right">
            <n-space>
              <n-button size="small" circle>
                <n-icon>
                  <Comment20Regular />
                </n-icon>
              </n-button>
            </n-space>
          </div>
        </n-space>
      </template>
    </n-thing>
  </n-list-item>
</template>

<style lang="less" scoped></style>
