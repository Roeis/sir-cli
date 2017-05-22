'use strict';

import {app, router, store} from './app';


export default context => {

    router.push(context.url);

    const s = Date.now();

    // context.initialState = store.state;

    return app;
}
