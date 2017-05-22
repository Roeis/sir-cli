'use strict';

const {utility}  = require('common/helper');
const icons = require('./icons');

module.exports = {
    async get(ctx, next) {
        ctx.type = 'html';

        let data = utility.getStaticInfoByName('demo');

        data.icons = icons;

        Object.assign(data, {
            icons,
            str:  'srtreseere\' s sdsd"sdd"" sdddd'
        });

        await ctx.render('desktop/home', data);
    },

}
