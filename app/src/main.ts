import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import test from './views/LoginWebsite.vue'
import router from './router'

const app = createApp(test)

app.use(createPinia())
app.use(router)

app.mount('#app')
