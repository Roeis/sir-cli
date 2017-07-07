'use strict'

const {utility} = require('common/helper')

module.exports = {
    /**
     * vue 路口
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
  async vue (ctx, next) {
    let { ssr } = ctx.query
    let isSSRMode = !!ssr
    let vueDom, initialState
    let defaultDom = '<div class="wrapper"></div>'

         // Attention, if router has a base field, it need be removed in server's url;
    let url = ctx.url.replace(/\/demo\/vue/, '')
    let data = utility.getStaticInfoByName('vuessr')

    if (isSSRMode) {
             // if data fetch by server-side, the shared data need be render on html that js could replace shared store
      let bundleRenderer = utility.getVueServerBundler('vuessr')
      if (bundleRenderer) {
        ({dom: vueDom, state: initialState} = await utility.generateSSRData(bundleRenderer, url))
      }
      data.vueDom = vueDom ? vueDom : defaultDom
      data.initialState = JSON.stringify(initialState)
    } else {
      data.vueDom = defaultDom
    }

    await ctx.render('desktop/demo/vuedemo', data)
  }
}
