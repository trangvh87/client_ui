# g1_client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
Tạo page 
Bước 1: tạo file js ví dụ
```
//ToKhaiNhap.js 

import Vue from 'vue'
import App from './components/HelloWorld.vue'

Vue.config.productionTip = false


new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
```
App from './components/HelloWorld.vue' chỉnh đến component chính sử dụng cho page

Bước 2: thêm cấu hình page trong 
```
// vue.config.js
module.exports ={
 
    publicPath: './',
  
  pages:{
    index:{
      // Entry point cho trang chính
      entry: 'src/main.js',
      // Template của HTML
      template: 'public/index.html',
      // File xuất ra sau khi build
      filename: 'index.html',
      // Khi sử dụng entry này, title của trang HTML sẽ được đặt là 'Home Page'
      title: 'Home Page',
    },
    tokhainhap:{
      // Entry point cho trang chính
      entry: 'src/ToKhaiNhap.js',
      // Template của HTML
      template: 'public/index.html',
      // File xuất ra sau khi build
      filename: 'ToKhaiNhap.html',
      // Khi sử dụng entry này, title của trang HTML sẽ được đặt là 'Home Page'
      title: 'ToKhaiNhap',
    },
    // thêm các entry point khác tại đây
  },
  ```