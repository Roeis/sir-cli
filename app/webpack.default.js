'use strict'

process.traceDeprecation = false

require('app-module-path').addPath(__dirname)

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ManifestPlugin = require('webpack-manifest-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const {env, utility} = require('common/helper')
// const pkg = require('package.json')
// const DashboardPlugin = require('webpack-dashboard/plugin');

let srcPath = path.resolve(env.root, 'static/src')
let distPath = path.resolve(env.root, 'static/dist')
let envPath = env.LOCAL || env.DEV
    ? 'dev' : env.QA
        ? 'qa' : 'release'
let postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [autoprefixer]
  }
}
let outputPath = path.resolve(distPath, env.COMPILE_TARGET, envPath)
let outputPublicPath = env.LOCAL ? utility.getPublicPath(env.COMPILE_TARGET) : ''
let devtool

// console.log(Object.keys(webpack))

/**
 * ### 打包方式 ###
 * 1.本地webpack打包
 *      CONSOLE: ./node_modules/.bin/webpack --config webpack.client.js
 * 2.package.json 配置script打包
 *      scripts: {
 *          webpack: 'webpack --config webpack.client.js'
 *      }
 *      CONSOLE: npm run webpack
 * 3.gulp添加task跑
 *      eg: gulp pack
 */

let rules = {
    /**
     * webpack 2.x | babel-loader >= 7.x (recommended)
     * ^6.2.10 will also work, but with deprecation warnings
     * @type {Object}
     */
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true
    }
  },
  eslint: {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules/,
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  json: {
    test: /\.json$/,
    loader: 'json-loader'
  },
  css: {
    test: /\.css$/,
    use: env.LOCAL
            ? ['style-loader', 'css-loader', postcssLoader]
            : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader?minimize=true', postcssLoader]
            })
  },
  scss: {
    test: /\.scss$/,
    use: env.LOCAL
            ? ['style-loader', 'css-loader', postcssLoader, 'sass-loader']
            : ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader?minimize=true', postcssLoader, 'sass-loader']
            })
  },
  image: {
    test: /\.(jpg|png|gif|ico)(\?.*)?(#.*)?$/,
    loader: 'url-loader',
    query: {
      name: env.LOCAL
                ? '[name].[ext]'
                : '[name].[hash].[ext]',
      limit: 4096
    }
  },
  font: {
    test: /\.(svg|eot|ttf|woff|woff2)(\?.*)?(#.*)?$/,
    loader: 'file-loader',
    query: {
      name: env.LOCAL
                ? '[name].[ext]'
                : '[name].[hash].[ext]'
    }
  },
  vue: {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      postcss: [autoprefixer]
    }
  }
}

let plugins = {
    // 生产用压缩
  uglifyJs: new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    sourceMap: false,
    compress: {
      warnings: false,
            // 删除所有的“console”语句
      drop_console: true,
            // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true
    }
  }),
    // mapping文件
  manifest: new ManifestPlugin(),
  loaderOptions: new webpack.LoaderOptionsPlugin({debug: true}),
  hotModuleReplacement: new webpack.HotModuleReplacementPlugin(),
  noEmitOnErrorsPlugin: new webpack.NoEmitOnErrorsPlugin(),
  define: new webpack.DefinePlugin({
    __LOCAL__: JSON.stringify(env.LOCAL),
    __DEV__: JSON.stringify(env.DEV),
    __QA__: JSON.stringify(env.QA),
    __PRE__: JSON.stringify(env.PRE),
    __RELEASE__: JSON.stringify(env.RELEASE),
    __SSR__: JSON.stringify(env.SSR),
    __PUBLIC_PATH__: JSON.stringify(outputPublicPath)
  }),
  extractCss: new ExtractTextPlugin(env.LOCAL || env.DEV
        ? '[name].css'
        : '[name].[chunkhash:8].css'),
    // https://github.com/johnagan/clean-webpack-plugin
  clean: new CleanPlugin([outputPath]),
    // dashboard: new DashboardPlugin(),
  vueSSRServer: new VueSSRServerPlugin(),
  vueSSRClient: new VueSSRClientPlugin()
}

let helper = {
  rules,
  plugins,
    /**
     * https://webpack.js.org/configuration/entry-context/
     * 添加客户端webpack入口文件配置
     * @param {[type]} pack [description]
     * @param {[type]} name [description]
     */
  addEntry (...names) {
        // https://github.com/glenjamin/webpack-hot-middleware
    let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true&timeout=2000'
    names.forEach(name => {
      let pathEntry = path.resolve(srcPath, env.COMPILE_TARGET, name)
      clientPack.entry[name] = []
            // 本地环境插入hot reload 脚本
      env.LOCAL && clientPack.entry[name].push(hotMiddlewareScript)
      clientPack.entry[name].push(pathEntry)
    })
  },

    /**
     * 添加VUE SSR 入口文件配置
     * @param {[type]} name     [description]
     * @param {[type]} filename [description]
     */
  addSSR (name) {
    serverPack.entry[name] = [path.resolve(srcPath, env.COMPILE_TARGET, name)]
  },

  setBanner () {
    let config = require('config')
    let parseGitConfig = require('parse-git-config')
    let gitConfig = parseGitConfig.sync({path: '.git/config'})
    let {name, email} = gitConfig.user || {}
    let localDate = new Date()
    let compileTimeString = localDate.toLocaleString()
    let compileYear = localDate.getFullYear()

    let banner = `========================
Copyright (c) ${compileYear} ${config.holder} All Rights Reserved.
author: ${email}
compiled: ${compileTimeString}
========================`

    let pluginBanner = new webpack.BannerPlugin(banner)
    clientPack.plugins.push(pluginBanner)
  },

  addVendor (...modules) {
    let opt = {
      name: [
        'vendor'
      ],
      minChunks: Infinity
    }
    let pluginCommonsChunk = new webpack.optimize.CommonsChunkPlugin(opt)
    clientPack.entry.vendor = modules
    clientPack.plugins.push(pluginCommonsChunk)
  }
}

// 配置前变量设置
if (env.LOCAL || env.DEV || env.QA) {
    /**
     * devtool 设置
     * 开发： eval, inline-source-map, eval-source-map, cheap-module-eval-source-map
     * 生产：source-map, hidden-source-map, cheap-source-map, nosources-source-map
     */
    // devtool = 'cheap-module-eval-source-map';
    // devtool = 'eval';
  devtool = 'cheap-module-source-map'
} else {
    // 将关闭sourcemap的生成，开启后extract css将附带sourcemap
  devtool = false
}

/**
 * 客户端资源打包配置
 *
 * entry 入口
 *      传递 string | [string], 自动命名为main
 *      传递 object, 入口名字为 key
 *
 * output 出口
 * @type {Object}
 */
let clientPack = {

    // entry: './src/entry',
  entry: {},
    // 输出
  output: {
    path: outputPath,
    filename: env.LOCAL || env.DEV
            ? '[name].js'
            : '[name].[chunkhash:8].js',
    publicPath: outputPublicPath
  },
    // 调试工具
    /**
     * * devtool: string | false
     *      development:
     *          eval, inline-source-map, eval-source-map, cheap-module-eval-source-map
     *      production:
     *          source-map, hidden-source-map, cheap-source-map, nosources-source-map
     * @type {[type]}
     */
  devtool,
    /**
     * module
     * @type {Object}
     */
  module: {
    rules: [
      rules.babel,
      rules.css,
      rules.scss,
      rules.json,
      rules.image,
      rules.font,
      rules.vue,
      rules.eslint
    ]
  },

    /**
     * target: string
     *      [async-node|electron-main|electron-render|node|node-webkit|web|webworker]
     *      默认 web，以浏览器环境打包
     * @type {String}
     */
  target: 'web',
    /**
     * resolve
     * @type {Object}
     */
  resolve: {
    extensions: [
      '.js', '.json', '.vue'
    ],
    modules: [path.resolve(__dirname, 'node_modules')],
        // vue 2 default in runtime-only
        // for details: https://vuejs.org/v2/guide/installation.html
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
        // enforceExtension: true
  },

  plugins: [
    plugins.define, plugins.extractCss, plugins.manifest
  ],
    /**
     * * watch: boolean
     * watchOptions: object
     *      aggregateTimeout, 防抖间隔
     *      ignored： 忽略文件
     *      poll: 定时检测变更
     * @type {Object}
     */
  watch: env.LOCAL,
  watchOptions: {
    aggregateTimeout: 500
        // ignored: /node_modules/,
        // poll: 1000
  },
  devServer: {
    compress: true,
    port: 9000
  },
    /**
     * stats 打包状态
     *      [errors-only|minimal|none|normal|verbose]
     *      minimal：built信息
     *      normal: hash, time, built
     *      verbose: 所有信息
     * @type {String}
     */
  stats: 'verbose'
    // externals: {
    //     // vue: 'Vue',
    // },
    // watch: false
}

// 插件配置
if (env.LOCAL) {
  clientPack.plugins.push(plugins.hotModuleReplacement)
  clientPack.plugins.push(plugins.noEmitOnErrorsPlugin)
} else {
  clientPack.plugins.push(plugins.clean)
}

if (env.PRERELEASE || env.RELEASE) {
  clientPack.plugins.push(plugins.uglifyJs)
  helper.setBanner()
}

let serverPack = {
  target: 'node',
  entry: {},
  output: {
    filename: 'bundle.js',
    path: path.resolve(distPath, env.COMPILE_TARGET, 'server'),
    libraryTarget: 'commonjs2'
  },
  resolve: clientPack.resolve,
  module: clientPack.module,
  externals: nodeExternals({
    whitelist: /\.(css|scss|vue)$/
  }),
  plugins: [plugins.define, plugins.uglifyJs, plugins.vueSSRServer]
}

module.exports = {
  clientPack,
  serverPack,
  helper
}
