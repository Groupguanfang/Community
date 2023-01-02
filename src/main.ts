import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPersist from "pinia-plugin-persist"
import { PostPV } from "lightning-community"
import App from "./App.vue"
import router from "./router"

import "./assets/style.less"

const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)

app.mount("#app")
PostPV()