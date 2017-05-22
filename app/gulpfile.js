'use strict';

require('app-module-path').addPath(__dirname);

const path = require('path');
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');

const {env} = require('common/helper');
const config = require('config');
const gulpUtil = require('gulp-util');

// ============================
// 任务
// ============================
let tasks = {
    startNodemon() {
        // let option = require('nodemon.json');
        let option = {
            script: 'start.js',
            ext: 'js html',
            env: {
                NODE_ENV: 'local',
                DEBUG: config.debug.name
            },
            execMap: {
                js: `node --inspect=${config.debug.port}`
            },
            delay: 2000,
            legacyWatch: true,
            ignore: [
                'log/**', 'test/**', 'static/**', 'server/view/**', 'node_modules/**'
            ],
            tasks: []
        };

        /**
         * 1.restart issue: https://github.com/remy/nodemon/issues/770
         * solve: enable legacyWatch
         */
        nodemon(option).on('restart', (event) => {
            console.log('NODEMON RESTART:', event || 'manually');
        });
    },
    bundle(type) {
        if (!env.COMPILE_TARGET) {
            console.warn('miss COMPILE_TARGET in environment variables');
            return;
        }

        let {clientPack, serverPack} = require(`static/src/${env.COMPILE_TARGET}/webpack.config.js`);

        let packConfig = type === 'server'
            ? serverPack
            : clientPack;

        webpack(packConfig, (err, stats) => {
            if (err) {
                throw new gulpUtil.PluginError('webpack', err);
            }
            gulpUtil.log('webpack', stats.toString({colors: true}));
        });
    },
    upload() {
        if (!env.COMPILE_TARGET) {
            console.warn('miss COMPILE_TARGET in environment variables');
            return;
        }
        let ftp = require('vinyl-ftp');
        let {host, user, password, catename, business} = require('config/ftp');
        let sourceDir,
            targetDir,
            connection;

        let envPath = env.LOCAL || env.DEV
            ? 'dev'
            : env.QA
                ? 'qa'
                : 'release';

        // 设置源文件路径目录，和目标上传路径, 自主配置
        sourceDir = path.resolve(env.root, `static/dist/${env.COMPILE_TARGET}/${envPath}`);
        targetDir = `${catename}/${env.COMPILE_TARGET}/${envPath}`;
        // QA环境上传路径和其他环境不一致，重新配置
        if (env.QA) {
            targetDir = `html/${business}/${catename}/${env.COMPILE_TARGET}/${envPath}`;
        }

        connection = ftp.create({host, user, password, parallel: 5, log: gulpUtil.log});

        return gulp.src([`${sourceDir}/**`], {buffer: false}).pipe(connection.newer(targetDir)).pipe(connection.dest(targetDir));
    },
    deploy(){
        let superagent = require('superagent');
        let {url, key} = require('config/deploy');

        superagent.post(`${url}/api/experimental_update`)
            .set('Content-Type', 'application/json')
            .send({'secret': key})
            .then(res => {
                console.log('executing: ',res.body);
            }, err => {
                console.log('net work not good, try again', err);
            });
    }
};

gulp.task('pack', () => {
    if (env.NODE_ENV === 'ssr') {
        tasks.bundle('server');
    } else {
        tasks.bundle('client');
    }
});

gulp.task('dev', () => {
    tasks.startNodemon();
});

// ============================
// 自定义拓展功能: ftp 上传
// ============================

gulp.task('upload', () => {
    tasks.upload();
});

gulp.task('deploy', () => {
    tasks.deploy();
});
