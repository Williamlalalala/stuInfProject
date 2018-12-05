import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-svg-icon/Icon.vue'
import Global from './components/Global.vue'

import router from './router'

Vue.use(ElementUI);
Vue.component('icon',Icon)
Vue.prototype.Global = Global

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
