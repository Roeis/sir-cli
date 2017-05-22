'use strict';

import Vue from 'vue';
import Editor from './components/editor';

let editor = new Vue({
    el: '.component-editor',
    components: {
        Editor
    }
});
