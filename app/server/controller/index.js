'use strict'

const path = require('path')
const {utility} = require('common/helper')

let controllers = {}
let list = utility.getDirs(path.resolve(__dirname, './'))

list.forEach(item => {
  controllers[item] = require(`server/controller/${item}`)
})

module.exports = controllers
