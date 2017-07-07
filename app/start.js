'use strict'

require('app-module-path').addPath(__dirname)

const http = require('http')
const config = require('config')
const {env, colors} = require('common/helper')

let app = require('server/app')
let {port} = config

let server = http.createServer(app.callback())

server.listen(port, () => {
    // 开发本地代理服务器 https://browsersync.io/docs
  if (env.LOCAL) {
    let browserSync = require('browser-sync').create()
    let pkg = require('package.json')
    let tool = `${colors.yellow('[LOCAL]')}`

    browserSync.init({
      open: false,
      notify: false,
      proxy: `127.0.0.1:${port}`,
      logConnections: true,
      logPrefix: 'BSR-SYNC-LOG',
      files: ['server/view/**']
    })

    console.log(`${tool} Server Name: ${colors.cyan(pkg.name)}`)
    console.log(`${tool} Server Environment: ${colors.cyan(env.NODE_ENV)}`)
    console.log(`${tool} Server Runs By: ${colors.cyan('Browser-Sync')}`)
  }
})
