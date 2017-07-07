'use strict'

const middlewares = require('server/middleware')
const controllers = require('server/controller')

const {body} = middlewares
const {experiment, demo} = controllers.api

module.exports = {
  extendTo (router) {
        // 实验，远程执行服务更新命令， 可以在生产环境自行关闭
    router.post('/api/experimental_update', body, experiment.post)

    router.get('/api/articles', demo.list)
    router.get('/api/article/:id', demo.detail)
  }
}
