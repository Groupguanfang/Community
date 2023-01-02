import { defineStore } from "pinia"
import type { TypeCommonStore } from "@/types/TypeStores"

export const useCommon = defineStore("common", {
  state: (): TypeCommonStore => {
    return {
      user: {},
    }
  },
  actions: {
    login(data: object) {
      this.user = data
    },
    logout() {
      this.user = {}
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "Common",
        storage: localStorage,
      },
    ],
  },
})
