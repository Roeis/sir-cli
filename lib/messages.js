'use strict'

let messages = {
  common: {
    ok: {
      en: 'are u sure',
      cn: '你确定一定以及肯定吗?'
    },
    duplicated: {
      en: 'the dirname\'s existed, please try another one',
      cn: '项目名已存在，请重新输入'
    },
    notNull: {
      en: 'the dirname can\'t be null, please input',
      cn: '不能为空，请输入'
    }
  },

  initProject: {
    name: {
      en: 'input new dirname or initialize here:',
      cn: '新建目录或在当前目录下初始化'
    }
  },

  createSource: {
    type: {
      en: 'select one front scaffold:',
      cn: '选择哪一个前端脚手架'
    },
    name: {
      en: 'input dirname:',
      cn: '输入你想创建的项目名称'
    }
  },

  packSource: {
    name: {
      en: 'select source dirname for package:',
      cn: '选择一个需要打包的前端项目源码: '
    },
    env: {
      en: 'select environment for package:',
      cn: '选择需要打包的环境: '
    }
  },

  uploadSource: {
    name: {
      en: 'select source dirname for upload:',
      cn: '选择一个需要上传的前端项目源码: '
    },
    env: {
      en: 'select environment for upload:',
      cn: '选择需要上传的环境: '
    }
  },

  startServer: {
    isHotModeOn: {
      en: 'trigger HOT-DEV mode on:',
      cn: '是否需要开启本地热编译模式'
    },
    name: {
      en: 'select a local source dirname with HOT-DEV mode:',
      cn: '选择一个本地热编译的前端项目'
    }
  },

  deployServer: {
    env: {
      en: 'select environment for deploy:',
      cn: '选择需要发布的环境: '
    }
  },

  configTool: {
    language: {
      en: 'select language:',
      cn: '语言选择'
    }
  }
}

module.exports = messages
