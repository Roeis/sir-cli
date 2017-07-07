'use strict'

// const path = require('path');
const {env} = require('common/helper')

module.exports = () => {
  return async(ctx, next) => {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404)
      }
    } catch (err) {
      err = err || {}
      ctx.status = err.status || 500

      ctx.app.emit('error', err, ctx)

            // 判断输出类型返回不同错误模板：在controller中需要定义， 默认HTML
      if (ctx.type === 'application/json') {
        ctx.body = {
          code: ctx.status,
          message: err.message,
          data: {
            stack: err.stack,
            env: env.NODE_ENV
          }
        }
      } else {
        await ctx.render('sys/500', {
          env: env.NODE_ENV,
          message: err.message,
          stack: err.stack,
          status: ctx.status
        })
      }
    }
  }
}
