'use strict'

const Koa = require('koa')
const router = require('server/router')
const middlewares = require('server/middleware')
const {env, utility} = require('common/helper')
const config = require('config')

const app = new Koa()

app.keys = config.keys

// error middleware on top, catch all error after here
app.use(middlewares.error)

// local developpment middlewares
env.LOCAL && middlewares.logger && app.use(middlewares.logger)
env.LOCAL && middlewares.hotDev && app.use(middlewares.hotDev)

config.middlewares.forEach(name => {
  app.use(middlewares[name])
})

router(app)

// not match any router, render 404
app.use(middlewares.notFound)

utility.logError(app)

module.exports = app
