'use strict'
let colors = {
  reset: '\x1b[0m',

  fontRed: '\x1b[31m',
  fontGreen: '\x1b[32m',
  fontYellow: '\x1b[33m',
  fontBlue: '\x1b[34m',
  fontMagenta: '\x1b[35m',
  fontCyan: '\x1b[36m'
}

let colorApi = {}
let colorsArr = ['green', 'red', 'yellow', 'blue', 'magenta', 'cyan']

function upperCase (str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

colorsArr.forEach(color => {
  let fontColor = colors['font' + upperCase(color)]
  colorApi[color] = str => `${fontColor}${str}${colors.reset}`
})

module.exports = colorApi
