'use strict';

const env = require('common/env');

let type = env.LOCAL || env.DEV
    ? 'development'
    : env.QA
        ? 'qa'
        : env.PRERELEASE
            ? 'prerelease'
            : 'release';

let config = {
    // 开发环境
    development: {
        host: '',
        user: '',
        password: '',
        origin: '',
    },
    // 测试环境
    qa: {
        host: '',
        user: '',
        password: '',
        origin: '',
    },
    // 生产前预览环境
    prerelease: {
        host: '',
        user: '',
        password: '',
        origin: '',
    },
    // 生产环境
    release: {
        host: '',
        user: '',
        password: '',
        origin: '',
    }
};

// ftp 项目文件夹
let business = 'dirone';                        // 一级目录, 产线
let catename = 'dirtwo';                  // 二级目录, 项目
let prefix = `${business}/${catename}`;    // FTP目录前缀

Object.assign(config[type], {
    business,
    catename,
    prefix,
});

module.exports = config[type];
