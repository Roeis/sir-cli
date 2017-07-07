'use strict'

const path = require('path')
const favicon = require('koa-favicon')
const nunjucks = require('koa-nunjucks-2')
const serveStatic = require('koa-static')
const etag = require('koa-etag')
const conditional = require('koa-conditional-get')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
const ratelimit = require('koa-ratelimit')
const body = require('koa-body')

// const useragent = require('koa-useragent');
const error = require('server/middleware/error')
const responseTime = require('server/middleware/responseTime')
const slash = require('server/middleware/slash')
const requestId = require('server/middleware/requestId')
const log = require('server/middleware/log')
const forbidden = require('server/middleware/forbidden')
const notFound = require('server/middleware/notFound')
const {env, utility, colors} = require('common/helper')

/**
 * webpack issue: Can't set headers after they are sent
 * https://github.com/webpack/webpack-dev-middleware/pull/177
 */

let faviconPath = path.resolve(__dirname, '../../static/favicon.ico')
let viewPath = path.resolve(__dirname, '../view')
let logPath = path.resolve(__dirname, '../../log/logstash.log')
let staicPath = path.resolve(__dirname, '../../static')
let staticConfig = {
  maxage: 0,
  gzip: true
}
let nunjucksConfig = {
  ext: 'html',
  path: viewPath,
  nunjucksConfig: {
    autoescape: true,
    noCache: env.LOCAL
  }
}
let forbiddenConfig = {
  paths: ['/src/']
    // forbidden requests' pathname start with 'src'
}
let ratelimitConfig = {
  duration: 1000 * 10,
  errorMessage: 'Sometimes You Just Have to Slow Down',
  max: 10
}
let logConfig = {
  filename: logPath
}

// 是否开启前端项目本地编译模式
// 开启后，前端编译在runtime进程中，没有实体文件，服务重启时会重新编译前端项目
// 关闭后，前端由打包命令完成打包，生成文件，在非前端业务中，比如api开发中可关闭，加快服务重启速度
let hotDevMode = !!env.COMPILE_TARGET
// let hotDevMode = true;
let hotDevMessage

let middlewares = {

  serveStatic: serveStatic(staicPath, staticConfig),

  forbidden: forbidden(forbiddenConfig),

  nunjucks: nunjucks(nunjucksConfig),

  favicon: favicon(faviconPath),

  error: error(),

  slash: slash(),

  responseTime: responseTime(),

  requestId: requestId(),

    // node4js json-type file log
  log: log(logConfig),

    // koa-logger for development env
  logger: logger(),

  conditional: conditional(),

  etag: etag(),

  helmet: helmet(),

  notFound: notFound(),

  body: body(),

  filebody: body({
    multipart: true,
    formidable: {
      keepExtensions: true,
      uploadDir: path.resolve(__dirname, '../../static/assets/upload')
    },
    onError (error, ctx) {
      console.log(error, ctx)
    }
  }),

    // TODO：需要DB支持
  ratelimit: ratelimit(ratelimitConfig)

}

if (env.LOCAL && hotDevMode) {
  let webpack = require('webpack'),
    hotDev = require('koa-webpack'), {clientPack} = require(`static/src/${env.COMPILE_TARGET}/webpack.config.js`),
    compiler = webpack(clientPack),
    hotDevConfig = {
      compiler,
      dev: {

        publicPath: utility.getPublicPath(env.COMPILE_TARGET),
                // publicPath is required, whereas all other options are optional

        noInfo: false,
                // display no info to console (only warnings and errors)

        quiet: false,
                // display nothing to the console

                // lazy: true,
                // switch into lazy mode
                // that means no watching, but recompilation on every request

        watchOptions: {
          aggregateTimeout: 500,
          poll: true
        },
                // watch options (only lazy: false)

                // custom headers
        stats: {
          colors: true
        }
      }
            // hot:{}
    }

  Object.assign(middlewares, {
    hotDev: hotDevMode
            ? hotDev(hotDevConfig)
            : false
  })
  hotDevMessage = 'on @ ' + env.COMPILE_TARGET
} else {
  hotDevMessage = 'off'
}

console.log(`${colors.green('[HOTDEV]')} FRONT-HOT-DEV-MODE: ${colors.cyan(hotDevMessage)}`)

module.exports = middlewares
