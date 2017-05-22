'use strict';

const middlewares = require('server/middleware');
const controllers = require('server/controller');

let {home, demo} = controllers.business;

module.exports = {
    extendTo(router){

        router.get('/', home.get);

        router.get('/demo/vue(/.*)?', demo.vue);
    }
};
