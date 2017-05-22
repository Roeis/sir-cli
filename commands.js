'use strict';

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const figlet = require('figlet');

const color = require('./lib/color');
const cmd = require('./lib/cmd');
const util = require('./lib/util');
const questions = require('./lib/questions');

// inquirer: https://github.com/SBoudrias/Inquirer.js
let banner = figlet.textSync('bone', {
    font: 'ghost',
    horizontalLayout: 'full'
});
console.log(color.green(banner));

let configPath = path.resolve(__dirname, 'config.json');
let configJson = require(configPath);
let cancelText = '> Operation Cancelled <';

let core = {

    /**
     * 初始化项目结构
     * @return {[type]} [description]
     */
    initProject() {
        let q = questions.getInitProjectQuestions();
        inquirer.prompt(q).then(answers => {
            let {name, ok} = answers;
            let cwd = process.cwd();
            let basePath = path.resolve(__dirname, 'app');
            let targetPath;
            if(ok){

                targetPath = name ? path.resolve(cwd, name) : cwd;
                console.log('[Status] copying');
                try{
                    fs.copySync(basePath, targetPath);
                    console.log('[Status] initialized successfully');
                }catch(e){
                    console.log('[Status] error', e.message);
                }

            }else{
                console.log(cancelText);
            }
        });
    },

    /**
     * 创建新的前端编译项目
     * @return {[type]} [description]
     */
    createSource() {
        let cwd = process.cwd();
        let targetPath = path.resolve(cwd, 'static/src/');
        let basePath = path.resolve(cwd, 'static/templates');
        let q = questions.getCreateSourceQuestions();
        inquirer.prompt(q).then(answers => {
            let {type, name, ok} = answers;

            if (ok) {
                try {
                    fs.copySync(path.resolve(basePath, type), path.resolve(targetPath, name));
                    console.log('TIP: after create an new front source, better to run "bone pack" flow for generate manifest.')
                    console.log('see detail in help: bone -h');
                } catch (e) {
                    console.log('create error@', e);
                }
            } else {
                console.log(cancelText);
            }
        });
    },

    /**
     * 打包
     * @return {[type]} [description]
     */
    packSource() {
        let q = questions.getPackSourceQuestions();
        inquirer.prompt(q).then(answers => {
            let {env, name, ok} = answers;

            if (ok) {
                cmd.run('gulp pack', {
                    COMPILE_TARGET: name,
                    NODE_ENV: env
                });
                console.log(`EXECUTING: COMPILE_TARGET=${name} NODE_ENV=${env} gulp pack`)
            } else {
                console.log(cancelText);
            }
        });
    },

    /**
     * 上传Source
     * @return {[type]} [description]
     */
    uploadSource() {
        let q = questions.getUploadSourceQuestions();
        inquirer.prompt(q).then(answers => {
            let {env, name, ok} = answers;
            if (ok) {
                cmd.run('gulp upload', {
                    COMPILE_TARGET: name,
                    NODE_ENV: env
                });
                console.log(`EXECUTING: COMPILE_TARGET=${name} NODE_ENV=${env} gulp upload`)
            } else {
                console.log(cancelText);
            }
        });
    },

    /**
     * 启动项目服务
     * @return {[type]} [description]
     */
    startServer() {
        let q = questions.getStartServerQuestions();
        inquirer.prompt(q).then(answers => {
            let {name, isHotModeOn} = answers;

            let option = isHotModeOn
                ? {
                    COMPILE_TARGET: name
                }
                : null;
            cmd.run('npm run start', option);
        });
    },

    /**
     * 工具配置
     * @return {[type]} [description]
     */
    configTool() {
        console.log('CONFIG LOCAL:');
        let lang = configJson.lang;
        let q = questions.getConfigToolQuestions();
        let fixStr = ' '.repeat(12);
        for (let key in configJson) {
            console.log(key + fixStr.slice(key.length), ':', configJson[key]);
        }

        inquirer.prompt(q).then(answers => {
            let {language, ok} = answers;
            language = language === 'english'
                ? 'en'
                : 'cn';
            if (ok && lang !== language) {
                configJson.lang = language;
                fs.writeFileSync(configPath, JSON.stringify(configJson));
            } else {
                console.log(cancelText);
            }
        });
    },

    deployServer() {
        let q = questions.getDeployServerQuestions();
        inquirer.prompt(q).then(answers => {
            let {env, ok} = answers;
            if(ok){
                cmd.run('gulp deploy', {
                    NODE_ENV: env
                });
                console.log(`EXECUTING: NODE_ENV=${env} gulp deploy`);
            }else{
                console.log(cancelText);
            }
        });
    }
};

module.exports = core;
