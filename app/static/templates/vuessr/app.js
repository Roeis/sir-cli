'use strict';

import Vue from 'vue';
import router from './router';
import store from './store';
import App from './components/app';

if(!__SSR__){
    require('./css/app.scss');
}

let app = new Vue({
    template: '<app></app>',
    components: {
        App
    },
    router,
    store
});

export {
    app,
    router,
    store
}
