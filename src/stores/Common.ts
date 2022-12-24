import { defineStore } from "pinia"

export const useCommon = defineStore("common", {
  state: () => {
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
