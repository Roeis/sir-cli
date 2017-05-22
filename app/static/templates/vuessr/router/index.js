
import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../components/main';
import NotFound from '../components/notfound';

Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    base: '/demo/vue/',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/foo',
            component: resolve => require(['../components/foo'], resolve)
        }, {
            path: '/bar',
            component: resolve => require(['../components/bar'], resolve)
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

export default router
