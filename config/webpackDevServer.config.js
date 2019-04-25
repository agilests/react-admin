'use strict';

const server = {
  contentBase: './public',
  host: 'localhost', //服务主机
  port: 8081, //端口
  historyApiFallback: true,
  inline: true, // 可以监控js变化
  // hot: true,  热启动
  compress: true,
  watchContentBase: true,
  publicPath: '/',
  proxy: { //设置代理服务器，用于调试接口
    '/api/*': {
      target:'http://localhost:8081',
      changeOrigin: true
    },
    '/login': {
      target:'http://localhost:8081',
      changeOrigin: true
    },
    '/logout': {
      target:'http://localhost:8081',
      changeOrigin: true
    }
  }
};
module.exports = server;
