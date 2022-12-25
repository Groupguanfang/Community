<script setup lang="ts">
import { NA } from "naive-ui"
import MdEditor from "md-editor-v3"
import "md-editor-v3/lib/style.css"
import { GetSingle } from "lightning-community"
import { useRoute } from "vue-router"
import { ref, onMounted, h } from "vue"
import { renderToString } from "vue/server-renderer"
const route = useRoute()
const main = ref()
const editor = MdEditor

const mounted = async () => {
  const request = await GetSingle("post", route.params.id)
  main.value = request.data.data
}
mounted()
</script>

<template>
  <editor class="padding" theme="dark" v-model="main" preview-only />
</template>
