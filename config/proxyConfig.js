module.exports = {
  proxy: {
    '/admin': { 
      target: 'http://192.168.31.120:8080', // 接口域名
      changeOrigin: true          
    },
    '/sys': {
      // target: 'http://192.168.31.120:8089', // 贾高强
      // target: 'http://192.168.31.156:8081', // 谭小龙
      target: 'http://192.168.31.134:8089', // 测试服务器
      changeOrigin: true         
    },
    '/business': {
      // target: 'http://192.168.31.120:8089', // 贾高强
      // target: 'http://192.168.31.156:8081', // 谭小龙
      target: 'http://192.168.31.134:8089', // 测试服务器
      changeOrigin: true         
    }
  }
}
