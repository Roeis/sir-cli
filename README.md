# bone-cli
a scaffold cli tool for web framework development based on koa2
# commmand line tool

# Bone

    脚手架: Bone
    核心：上手快速，开发体验极致

![bone](http://n1image.hjfile.cn/mh/2017/05/15/75198ce65d81c72a9dd1aca7bd815c4f.png)

**includes**
    - 前后端集成式开发，支持开发热更新
    - 多前端项目模板支持，提供可配置webpack配置集成
    - 友好的开发流程
    - 基于koa2, 获得较好的开发体验，Node.js 7.8+ 推荐8+
    - 浏览器自动刷新

**installation**

    npm i -g bone-cli

### Command line Tool Api

    bone init       // 初始化项目
    bone start      // 启动项目，本地开发
    bone pack       // 前端工程资源打包
    bone create     // 创建前端工程项目
    bone upload     // 前端工程资源上传
    bone deploy     // 发布项目
    bone config     // 工具配置

### Quick Start

    1.bone init demo

    2.yarn/npm install

    3.bone start

### Detail

    on progress

### issue

1. yarn remove [package], resync yarn lockfile
    especially on 'node-sass' by 'sass-loader', it will lead to sass compilation fail. u can remove sass-loader and add again to fix this issue
    移除模块时， yarn会重置整个依赖关系，特别的会重新下载编译node-sass, 该模块下载较困难会导致模块缺失。移除依赖的sass-loader后，重新加载回来使用：yarn add

2. headers have already been sent
    when access files not existed, will occurs this problem, cause the webpack-dev-middleware dont support koa2, lack of pormise support

### 调试

本地调试：

使用 npm link 绑定到全局变量。

取消绑定 npm unlink

npm link 后，全局命令会有当前命令行工具：bone, 使用
