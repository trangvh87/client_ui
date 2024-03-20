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
    login:{
      // Entry point cho trang chính
      entry: 'src/Login.js',
      // Template của HTML
      template: 'public/index.html',
      // File xuất ra sau khi build
      filename: 'login.html',
      // Khi sử dụng entry này, title của trang HTML sẽ được đặt là 'Home Page'
      title: 'Đăng nhập',
    },
    // Bạn có thể thêm nhiều entry point khác tại đây
  },
  chainWebpack: config =>{
    if (process.env.NODE_ENV === 'production'){
      // Tùy chỉnh tên file JS
      config.output.filename('js/[name].yourCustomName.js');
      config.output.chunkFilename('js/[name].yourCustomName.js');

      // Tùy chỉnh tên file CSS
      config.plugin('extract-css').tap(args => [{
        filename: 'css/[name].yourCustomName.css',
        chunkFilename: 'css/[name].yourCustomName.css',
      }]);
    }
  }
}
