import Vue from 'vue'
import App from './components/KhaiTamToKhai/ToKhaiNhap/them-sua-to-khai-nhap.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './lang'
import '@/components/KhaiTamToKhai/ToKhaiNhap/css-to-khai-nhap.scss'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
