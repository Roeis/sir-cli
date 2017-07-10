module.exports = {
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  plugins: [
    'standard',
    'promise',
    // required to lint *.vue files
    'html'
  ],
  rules: {
  }
}
