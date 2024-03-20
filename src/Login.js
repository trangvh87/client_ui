import Vue from 'vue'
import App from './components/Login/login.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'mini', // set element-ui default size

})

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
