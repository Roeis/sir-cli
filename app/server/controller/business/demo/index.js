'use strict'

const {utility} = require('common/helper');

module.exports = {
    /**
     * vue 路口
     * @param  {[type]}   ctx  [description]
     * @param  {Function} next [description]
     * @return {Promise}       [description]
     */
    async vue(ctx, next) {
        let data = utility.getStaticInfoByName('vuessr');

        let vueDom;
        let bundleRenderer = utility.getVueServerBundler('vuessr');

        // Attention, if router has a base field, it need to be removed in server's url;
        let url = ctx.url.replace(/\/demo\/vue/, '');

        if(bundleRenderer){
            vueDom = await new Promise((resolve, reject) => {
                bundleRenderer.renderToString({
                    url: url
                },(err, html) => {
                    console.log(html, err);
                    resolve(err ? '' : html);
                });
            })
        }

        data.vueDom = false ? vueDom : '<div class="wrapper"></div>';

        await ctx.render('desktop/demo/vuedemo', data);
    },
}
