'use strict';

const Router = require('koa-router');
const middlewares = require('server/middleware');
const business = require('server/router/business');
const api = require('server/router/api');

let router = Router();
/**
 * TODO：路由配置规范
 *  1. API 规范
 *  2. 业务路由规范
 *
 * example:
 *  ## API
 *      /api/article/:id
 *      /\api/\article/\d+
 *
 *  ## BUSINESS
 *      /busione/list/:id
 *      /busione/search/:str
 */

router.use(middlewares.responseTime);

business.extendTo(router);
api.extendTo(router);

const route = app => {
    app.use(router.routes());
    app.use(router.allowedMethods());
};

module.exports = route;
