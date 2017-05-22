'use strict';
const env = require('./env');
const config = require('config');
const path = require('path');
const fs = require('fs-extra');

let {name: debugName} = config.debug;
let {prefix, origin} = config.ftp;
let debug = require('debug')(debugName);

let envPath = env.LOCAL || env.DEV
    ? 'dev'
    : env.QA
        ? 'qa'
        : 'release';

let core = {

    /**
     * 生成不同环境对应的publicPath,
     * 在静态资源抽离在其他服务器时，在异步懒加载模块的场景下，需要使用绝对地址来引用资源。
     * @param  {Boolean} isOnCompile [description]
     * @param  {[type]}  target      [description]
     * @return {[type]}              [description]
     */
    getPublicPath(target) {
        let isOnCompile = env.LOCAL && env.COMPILE_TARGET === target;
        let publicPath = isOnCompile
            ? `/runtime/${target}/`
            : `/dist/${target}/${envPath}/`;

        // : env.DEV || env.QA || env.PRERELEASE || env.RELEASE
        //     ? `${origin}/${prefix}/${target}/${envPath}/`

        return publicPath;
    },

    /**
     * 获取前端工程编译后打包的信息对象，是否需要外链样式，manifest等
     * @param  {[type]} target [description]
     * @return {[type]}        [description]
     */
    getStaticInfoByName(target) {

        let isInDevelopment = env.LOCAL || env.DEV;
        let isExtractCss = !isInDevelopment;
        let manifest = require(`../static/dist/${target}/${envPath}/manifest.json`);
        let resUrl = this.getPublicPath(target);

        return {
            isExtractCss,
            entrance: entry => `${resUrl}${manifest[entry]}`
        };
    },

    getVueServerBundler(target){
        let VueRender = require('vue-server-renderer');
        let bundlePath = path.resolve(__dirname, `../static/dist/${target}/server/bundle.js`);
        let code, bundler;
        try{
            code = fs.readFileSync(bundlePath, 'utf-8');
            bundler = VueRender.createBundleRenderer(code);
        }catch(e){
            throw e;
        }

        return bundler;
    },

    logError(app) {

        // 监控错误日志
        app.on('error', (err, ctx) => {
            debug('APP ERROR: ', ctx);
            ctx && ctx.log && ctx.log.error(err);
        });

        // 捕获promise reject错误
        process.on('unhandledRejection', (reason, promise) => {
            debug('unhandledRejection: ', reason, promise);
        });

        // 捕获未知错误
        process.on('uncaughtException', err => {

            debug('uncaughtException: ', err);
            if (err.message.indexOf('EADDRINUSE') > -1) {
                process.exit();
            }
        });
    },

    result(code = 0, message = 'success', data = null) {
        return {code, message, data};
    }

};

module.exports = core;
