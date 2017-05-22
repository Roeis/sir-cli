'use strict';

const path = require('path');
const messages = require('./messages');
const util = require('./util');

let configPath = path.resolve(__dirname, '../config.json');
let configJson = require(configPath);
let {lang, sourcePath, templatePath} = configJson;
let cwd = process.cwd();

const questions = {

    getInitProjectQuestions() {
        return [
            {
                type: 'input',
                name: 'name',
                message: messages.initProject.name[lang],
                validate(value) {
                    let cwdDirnames = util.getDirs(cwd);
                    if (value) {
                        let isExisted = cwdDirnames.includes(value);
                        let message = messages.common.duplicated[lang];
                        return !isExisted || message;
                    } else {
                        return true;
                    }
                }
            }, {
                type: 'confirm',
                name: 'ok',
                message: messages.common.ok[lang],
                default: true
            }
        ];
    },

    getCreateSourceQuestions() {
        let staticDirnames = util.getDirs(path.resolve(cwd, sourcePath));
        let templateDirnames = util.getDirs(path.resolve(cwd, templatePath));
        if(templateDirnames.length === 0){
            console.log('[TIP] Please create some front source template.')
        }
        return [
            {
                type: 'list',
                name: 'type',
                message: messages.createSource.type[lang],
                choices: templateDirnames
            }, {
                type: 'input',
                name: 'name',
                message: messages.createSource.name[lang],
                validate(value) {
                    // 判断目录中是否已存在同名文件夹
                    let isDuplicated = staticDirnames.includes(value),
                        isBlank = !value,
                        message;
                    isDuplicated && (message = messages.common.duplicated[lang]);
                    isBlank && (message = messages.common.notNull[lang]);
                    return !isDuplicated && !isBlank || message;
                }
            }, {
                type: 'confirm',
                name: 'ok',
                message: messages.common.ok[lang],
                default: true
            }
        ];
    },

    getPackSourceQuestions() {
        let staticDirnames = util.getDirs(path.resolve(cwd, sourcePath));
        return [
            {
                type: 'list',
                name: 'name',
                message: messages.packSource.name[lang],
                choices: staticDirnames
            }, {
                type: 'list',
                name: 'env',
                message: messages.packSource.env[lang],
                choices: configJson.packEnv
            }, {
                type: 'confirm',
                name: 'ok',
                message: messages.common.ok[lang],
                default: true
            }
        ];
    },

    getUploadSourceQuestions() {
        let staticDirnames = util.getDirs(path.resolve(cwd, sourcePath));
        return [
            {
                type: 'list',
                name: 'name',
                message: messages.uploadSource.name[lang],
                choices: staticDirnames
            }, {
                type: 'list',
                name: 'env',
                message: messages.uploadSource.env[lang],
                choices: configJson.uploadEnv
            }, {
                type: 'confirm',
                name: 'ok',
                message: messages.common.ok[lang],
                default: true
            }
        ];
    },

    getStartServerQuestions() {
        let staticDirnames = util.getDirs(path.resolve(cwd, sourcePath));
        return [
            {
                type: 'confirm',
                name: 'isHotModeOn',
                message: messages.startServer.isHotModeOn[lang],
                default: true
            }, {
                type: 'list',
                name: 'name',
                message: messages.startServer.name[lang],
                choices: staticDirnames,
                when(answers) {
                    return answers.isHotModeOn;
                }
            }
        ];
    },

    getDeployServerQuestions(){
        return [
            {
                type: 'list',
                name: 'env',
                message: messages.deployServer.env[lang],
                choices: configJson.deployEnv
            },{
                type: 'confirm',
                name: 'ok',
                message: messages.common.ok[lang],
                default: true
            }
        ]
    },

    getConfigToolQuestions() {
        return [
            {
                type: 'list',
                name: 'language',
                message: messages.configTool.language[lang],
                choices: configJson.languages
            }, {
                type: 'confirm',
                name: 'ok',
                message: messages.common.ok[lang],
                default: true
            }
        ];
    }
};
module.exports = questions;
