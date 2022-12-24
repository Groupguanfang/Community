<script setup lang="ts">
import Footer from "@/components/common/Footer.vue"
import { useMessage } from "naive-ui"
import { useCommon } from "@/stores/Common"
import { useRouter } from "vue-router"
const common = useCommon()
const router = useRouter()
const message = useMessage()

if (JSON.stringify(common.user) === "{}") {
  message.warning("请先登录")
  router.push("/user/login")
}
</script>

<template>
  <Footer />
</template>
