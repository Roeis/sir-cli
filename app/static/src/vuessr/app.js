'use strict';

import Vue from 'vue';
import { sync } from 'vuex-router-sync'
import router from './router';
import store from './store';
import App from './components/app';

if(!__SSR__){
    require('./css/app.scss');
    require('./css/bootstrap/css/bootstrap.css');
}

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

let app = new Vue({
    router,
    store,
    render: h => h(App)
});

export {
    app,
    router,
    store
}
