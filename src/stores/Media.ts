import { defineStore } from "pinia"

export const useMedia = defineStore('media',{
    state: () => {
      return {
        path: '/'
      }
    },
    actions: {
      push(path) {
        if (this.path !== '/') {
          this.path = this.path + path
        } else {
          this.path = path
        }
        console.log(this.path)
      }
    }
})