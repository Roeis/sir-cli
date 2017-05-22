'use strict';

const uuid = require('uuid');

module.exports = () => {
    return (ctx, next) => {
        /**
            There are two different ways of generating a UUID.

            If you just need a unique ID, you want a version 1 or version 4.

            Version 1: This generates a unique ID based on a network card MAC address and a timer. These IDs are easy to predict (given one, I might be able to guess another one) and can be traced back to your network card. It's not recommended to create these.
            Version 4: These are generated from random (or pseudo-random) numbers. If you just need to generate a UUID, this is probably what you want.

            If you need to always generate the same UUID from a given name, you want a version 3 or version 5.

            Version 3: This generates a unique ID from an MD5 hash of a namespace and name. If you need backwards compatibility (with another system that generates UUIDs from names), use this.
            Version 5: This generates a unique ID from an SHA-1 hash of a namespace and name. This is the preferred version.
         */
        ctx.state.requestId = uuid.v4().replace(/-/g, '');
        return next();
    };
}
