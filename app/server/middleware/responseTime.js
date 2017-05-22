'use strict';

/**
 * 请求响应时间
 * @return {[type]} [description]
 */
module.exports = () => {
    return async (ctx, next) => {
        let start = Date.now();

        await next();

        let delta = Date.now() - start;
        console.log('await', delta);
        // do something with delta

        ctx.log && ctx.log.access({
            responseTime: delta
        });
    };
};
