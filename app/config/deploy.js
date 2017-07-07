'use strict'

const env = require('common/env')

let type = env.LOCAL || env.DEV
    ? 'development'
    : env.QA
        ? 'qa'
        : env.PRERELEASE
            ? 'prerelease'
            : 'release'

let config = {
    // 开发环境
  development: {
    url: '',        // remote server url
    key: ''        // custom secret
  },
    // 测试环境
  qa: {
    url: '',
    key: ''
  },
    // 生产前预览环境
  prerelease: {
    url: '',
    key: ''
  },
    // 生产环境
  release: {
    url: '',
    key: ''
  }
}

module.exports = config[type]
