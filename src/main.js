import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入设计系统样式
import './styles/variables.css'
import './styles/common.css'
import './styles/animations.css'
import './styles/layout.css'
import './styles/element-custom.scss'
import './assets/main.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 初始化应用
store.dispatch('app/initApp')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')