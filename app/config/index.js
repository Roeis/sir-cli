'use strict'

const ftp = require('config/ftp')
const LOCAL_PORT = 6060

let config = {

    // 服务默认启动端口
  port: process.env.PORT || LOCAL_PORT,

    // static配置
  static: false,

    // http日志
  logger: true,

    // set signed cookie keys
  keys: ['secret', 'keys', 'for', 'crypto'],

    // copyright holder name, for packing resource
  holder: 'holder Inc',

    // APP通用中间件列表
  middlewares: [
    'favicon',
    'conditional',
    'etag',
    'helmet',
    'slash',
    'nunjucks',
    'requestId',
    'log',
    'forbidden',
    'serveStatic'
  ]
}

Object.assign(config, {
  debug: {
    name: 'DEV-LOG',        // node-debug's name
    port: parseInt(config.port, 10) + 100
  },
  ftp
})

module.exports = config
