'use strict';

module.exports = () => {

    return async(ctx, next) => {
        ctx.log && ctx.log.access();
        ctx.status = 404;
        await ctx.render('sys/400', {
            status: ctx.status
        });
    }
}
