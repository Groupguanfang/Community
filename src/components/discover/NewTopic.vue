<script setup lang="ts">
import { ref } from "vue"
import { empty } from "@/utils/Empty"
import { PostDraft } from "lightning-community"
import { useCommon } from "@/stores/Common"
import { useMessage, NSpace, NInput, NButton } from "naive-ui"
const message = useMessage()
const common = useCommon()

defineProps({})
const emits = defineEmits(["onSend"])

const text = ref()
const size = { minRows: 5 }
const loading = ref(false)

const send = async () => {
  if (empty(text.value)) {
    message.warning("请填写内容")
    return
  }
  if (text.value.length < 6) {
    message.warning("内容不能少于6个字")
    return
  }
  const request = await PostDraft(
    common.user.token,
    "topic",
    "",
    text.value,
    "open",
    1,
    undefined,
    "",
  )
  message.success(request.message)
  emits("onSend")
}
</script>

<template>
  <n-space vertical class="margin" size="large">
    <n-input
      type="textarea"
      size="large"
      placeholder="写一些琐事..."
      :autosize="size"
      v-model:value="text"
    />
    <n-button
      @click="send"
      :loading="loading"
      size="large"
      type="primary"
      block
    >
      发布
    </n-button>
  </n-space>
</template>
