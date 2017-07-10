'use strict'

import {app, router, store} from './app'

export default context => {
  return new Promise((resolve, reject) => {
    router.push(context.url)

    let start = Date.now()

    router.onReady(() => {
      let matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        reject({code: 404})
      }

      let promises = matchedComponents.map(component => {
        return component.asyncData && component.asyncData({store, route: router.currentRoute})
      })

      Promise.all(promises).then(() => {
        console.log(`data pre-fetch: ${Date.now() - start}ms`)
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // Expose the state on the render context, and let the request handler
                // inline the state in the HTML response. This allows the client-side
                // store to pick-up the server-side state without having to duplicate
                // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
    // return app;
}
