'use strict'

import './css/demo.scss'

import Vue from 'vue'
import App from './components/App.vue'

// if (env.isPrerelease) {
//   __webpack_public_path__ = window.RES_PUBLIC_PATH
// }

let app = new Vue({
  replace: false,
  el: '.app',
  components: {
    App
  }
})

export default app
