'use strict'

import {app, router, store} from './app'

console.log(store)
export default context => {
  router.push(context.url)
  // context.initialState = store.state;
  return app
}
