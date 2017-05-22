'use strict';

module.exports = (opts) => {
    let paths = opts && opts.paths || [];

    return async(ctx, next) => {
        let reqPath = ctx.path;
        
        paths.forEach(path => {
            if (reqPath.indexOf(path) > -1) {
                ctx.throw(403);
            }
        })
        await next();
    }
}
