
<div style="height:200px;text-align:center;">
    <br />
    <img src="https://n1image.hjfile.cn/mh/2017/06/06/3dba5a3737bd778765ccf4807472cc1b.png" alt="sir Banner"/>
    <br />
</div>


**Status: building**

a command-line tool for web framework development based on koa2

**includes**
    - 前后端集成式开发，支持开发热更新
    - 多前端项目模板支持，提供可配置webpack配置集成
    - 友好的开发流程
    - 基于koa2, 获得较好的开发体验，Node.js 8+
    - 浏览器自动刷新

**installation**

    npm i -g sir-cli

### Command line Tool Api

    sir init       // 初始化项目
    sir start      // 启动项目，本地开发
    sir pack       // 前端工程资源打包
    sir create     // 创建前端工程项目
    sir upload     // 前端工程资源上传
    sir deploy     // 发布项目
    sir config     // 工具配置

### Quick Start

    $ sir init

    $ yarn/npm install

    $ sir start

### Detail

    on progress, prepare gitbook

### Issue

1. yarn remove [package], resync yarn lockfile
    especially on 'node-sass' by 'sass-loader', it will lead to sass compilation fail. u can remove sass-loader and add again to fix this issue

    移除模块时， yarn会重置整个依赖关系，特别的会重新下载编译node-sass, 该模块下载较困难会导致模块缺失。移除依赖的sass-loader后，重新加载回来使用：yarn add

2. headers have already been sent
    when access files not existed, will occurs this problem, cause the webpack-dev-middleware dont support koa2, lack of pormise support

### 调试

本地调试：

使用 npm link 绑定到全局变量。

取消绑定 npm unlink

npm link 后，全局命令会有当前命令行工具: sir, 使用

### name proposal

burn | tomato | eli | sir | carbon | teris | ellie | hot2 | madam

sir start | pack | upload
