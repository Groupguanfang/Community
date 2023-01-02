<script setup lang="tsx">
import { ref, onMounted, type Ref } from "vue"
import {
  useMessage,
  NSelect,
  NButtonGroup,
  NButton,
  useOsTheme,
  NSpace,
  NInput,
  NCheckbox,
  NA,
  NText,
  NIcon,
} from "naive-ui"
import { Delete16Regular } from "@vicons/fluent"
import MdEditor from "md-editor-v3"
import { empty } from "@/utils/Empty"
import "md-editor-v3/lib/style.css"
import { tools } from "@/theme"
import { PostDraft as NewDraft, GetCateogry } from "lightning-community"
import { fixEditor } from "@/utils/Fix"
import { useCommon } from "@/stores/Common"
import axios from "axios"
const editor = MdEditor
const theme: Ref<any> = useOsTheme()
const message = useMessage()
const common = useCommon()

const title = ref("")
const text = ref("")
const category = ref(1)
const categorys = ref([])
const id = ref(undefined)
const isAccepted = ref(false)

async function save() {
  if (empty(title.value, text.value)) {
    message.warning("请填写完整内容")
    return
  }
  const data = await NewDraft(
    common.user.token,
    "post",
    title.value,
    text.value,
    "open",
    category.value,
    // @ts-ignore
    id.value === undefined ? "" : id.value,
    "",
  )
  // @ts-ignore
  id.value = data.data.insertId
  message.success(data.message)
}

function upload(files: Array<any>, callback: Function) {
  let form = new FormData()
  form.append("files", files[0])
  axios
    .post("https://api.light.xhhzs.cn/v2/user/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        cookie: common.user.token,
        type: "我的文章",
      },
    })
    .then(res => {
      message.success(res.data.message)
      const success = res.data.data.map((item: any) => {
        return item["path"]
      })
      callback(success)
    })
    .catch(error => {
      message.error(error)
    })
}

async function putToCheck() {
  if (!isAccepted.value) {
    message.warning("请同意社区规定")
    return
  }
  if (empty(id.value)) {
    message.warning("请先点击保存，再提交审核")
    return
  }
}

onMounted(async () => {
  fixEditor()
  let cate = await GetCateogry(999, 0)
  categorys.value = cate.data.map((item: any) => {
    return {
      label: item["name"],
      value: item["id"],
    }
  })
})
</script>

<template>
  <n-space vertical class="gap">
    <n-input
      v-model:value="title"
      size="large"
      placeholder="请输入文章标题"
      perview
    />
    <editor
      @onUploadImg="upload"
      :toolbars="tools"
      :theme="theme"
      v-model="text"
    />

    <n-button size="large" block type="primary" @click="save()">
      保存
    </n-button>

    <div class="check">
      <n-button style="width: 86%" block size="large" @click="putToCheck">
        提交审核
      </n-button>
      <n-button circle>
        <template #icon>
          <n-icon :component="Delete16Regular" />
        </template>
      </n-button>
    </div>

    <n-space>
      <n-checkbox size="large" v-model:checked="isAccepted" />
      <n-text style="word-wrap: break-word">
        确保您已经详细阅读了<router-link
          to="/post/1"
          #="{ navigate, href }"
          custom
        >
          <n-a :href="href" @click="navigate">社区规定</n-a>
        </router-link>
      </n-text>
    </n-space>
    <n-select size="large" v-model:value="category" :options="categorys" />
  </n-space>
</template>

<style lang="less" scoped>
.gap {
  margin: 10px;
}

.check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
