
import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../components/main';
import NotFound from '../components/notfound';
import Article from '../components/article';
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
            path: '/article/:id/',
            component: Article
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});

export default router
