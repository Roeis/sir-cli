'use strict'

import Vue from 'vue'
import {app, router, store} from './app'
import loadbar from './widgets/loadbar'

const bar = Vue.prototype.$bar = new Vue(loadbar).$mount()
document.body.appendChild(bar.$el)

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // to, from, next
  router.beforeResolve((to, from, next) => {
    // let matchedNext = router.getMatchedComponents(to)
    // let matchedPrev = router.getMatchedComponents(from)

    // let diffed = false
    // let activated = matchedNext.filter((component, i) => {
    //     return diffed || (diffed = (matchedPrev[i] !== component))
    // })
    // console.log('activated', activated);
    // if (!activated.length) {
    //     return next()
    // }
    // let promiseSsyncData = activated.map(component => {
    //     return component.asyncData && component.asyncData({store, route: to})
    // });
    //
    // Promise.all(promiseSsyncData).then(() => {
    //     next();
    // }).catch(next);
    next()
  })

  app.$mount('.wrapper')
})
