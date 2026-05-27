import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"

import PrimeVue from "primevue/config"
import Aura from "@primevue/themes/aura"
import ConfirmationService from "primevue/confirmationservice"
import ToastService from "primevue/toastservice"

import "primeicons/primeicons.css"
import "./style.css"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(ConfirmationService)
app.use(ToastService)
app.use(router)
app.mount("#app")
