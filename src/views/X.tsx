import { h, defineComponent, defineProps } from "vue"
import { renderToString } from "vue/server-renderer"
import { NA, NText } from "naive-ui"

export default defineComponent({
  async setup() {
    const props = defineProps({
      data: Array,
    })
    function DFS(arr = []) {
      for (let i = 0; i < props.data.length; i++) {
        let item = props.data[i]
        if (item.node === "element") {
          // a
          if (item.tag === "a") {
            const link = h(
              NA,
              {
                href: item.attr.href,
              },
              {
                default: () => {
                  if (item.child && item.child.length) {
                    return item.text + DFS(item.child, arr)
                  }
                },
              },
            )
          } else if (item.tag === "p") {
            const link = h(
              NText,
              {},
              {
                default: () => {
                  if (item.child && item.child.length) {
                    return item.text + DFS(item.child, arr)
                  }
                },
              },
            )
          }
          //
        }
      }
    }
    return await renderToString(DFS())
  },
})
