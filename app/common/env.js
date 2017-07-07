'use strict'

const path = require('path')

let env = process.env.NODE_ENV
let compileTarget = process.env.COMPILE_TARGET
let root = path.resolve(__dirname, '../')

env = env && env.toLowerCase()

module.exports = {
  root: root,
  NODE_ENV: env,
  COMPILE_TARGET: compileTarget,
  LOCAL: env === 'local',
  DEV: /^dev/.test(env),
  QA: /^qa/.test(env),
  PRERELEASE: /^(pre|yz)/.test(env),
  RELEASE: /^(release|production)/.test(env),
  SSR: env === 'ssr'
}
