'use strict';

import './css/demo.scss';

import Vue from 'vue';
import App from './components/App.vue';

if(env.isPrerelease){
    __webpack_public_path__ = __PUBLIC_PATH__.replace(/res\./, 'yzres.');
}

let app = new Vue({
    replace: false,
    el: '.app',
    components:{
        App
    }
});
