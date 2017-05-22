'use strict';

const {name} = require('../package.json');

module.exports = {
    apps: [{
        name,
        script: './start.js',
        env: {
            PORT: 3500,
            NODE_ENV: 'production',
        },
        exec_mode: 'cluster',
        instances: 2,
        watch: true,
        ignore_watch: ['node_modules','log'],
        max_memory_restart: '500M'
    }]
}
