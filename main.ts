import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
// 全局挂在form组件
import Gukki_FormPuls from './packages/index'

createApp(App).use(ElementPlus, { size: 'small', zIndex: 3000 }).use(Gukki_FormPuls).mount('#app')
