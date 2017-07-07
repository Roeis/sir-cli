'use strict'

const {utility} = require('common/helper')
const mocklist = require('./mocklist')
const mockdata = require('./mockdata')

module.exports = {
  async list (ctx, next) {
    ctx.type = 'json'

    let {index = 1} = ctx.query

    index = index < 3 ? index : 3
    ctx.body = mocklist[index - 1]
  },

  async detail (ctx, next) {
    ctx.type = 'json'

    let {id} = ctx.params

    let detail = mockdata[id] ? mockdata[id] : mockdata[0]

    ctx.body = detail
  }
}
