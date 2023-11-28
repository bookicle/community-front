
import { createApp } from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'


import './assets/base.scss'


const app = createApp(App)

app.use(router)
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;


app.mount('#app')
