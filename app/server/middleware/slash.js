'use strict'

const slash = () => {
  return async (ctx, next) => {
    let {path, search, method} = ctx
    let isApiPath = /^\/api/.test(path)
    let isMissSlash = path.slice(-1) !== '/'
    let isGetMethod = /\get/i.test(method)
    let isResource = /\.[^\/]*$/.test(path)

    if (isMissSlash && !isResource && !isApiPath && isGetMethod) {
      ctx.status = 301
      path += `/`
      return ctx.redirect(path + search)
    }

    await next()
  }
}

module.exports = slash
