'use strict'

const {name} = require('../package.json')

module.exports = {
  apps: [{
    name,
    script: './start.js',
    env: {},
    exec_mode: 'fork',
    max_memory_restart: '500M',
    watch: true,
    ignore_watch: ['.git', 'node_modules', 'log']
  }]
}
