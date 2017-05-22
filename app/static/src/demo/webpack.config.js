'use strict';

const { clientPack, serverPack, helper } = require('webpack.default.js');

/**
 * client webpack config
 * {
 *      entry           // Object
 *      output          // Object
 *      module.rules    // Array
 *      plugins         // Array
 *  }
 * @type {Array}
 *
 * >> u can extend default webpack config here >>
 * for example, add a new rule:
 *  clientPack.module.rules.push(someNewRule);
 */

// 配置添加入口
helper.addEntry('demo', 'upload', 'editor');

// 配置添加SSR入口
helper.addSSR('editor');

// 配置添加公用模块Vendor
helper.addVendor('vue', 'lodash');


module.exports = {
    clientPack,
    serverPack
}
