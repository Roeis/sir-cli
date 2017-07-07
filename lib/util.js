'use strict'

const fs = require('fs-extra')
const path = require('path')

let util = {
  getDirs (parentDir) {
    let dirs = []

    try {
      dirs = fs.readdirSync(parentDir)

      dirs = dirs.filter(dir => {
        let stat = fs.statSync(path.resolve(parentDir, dir))
        return stat.isDirectory()
      })
    } catch (e) {
      console.log('Get Dirnames Error ', e.message)
    }

    return dirs
  },
  getLang () {

  }
}

module.exports = util
