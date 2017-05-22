'use strict';

const commander = require('commander');
const commands = require('./commands');
const pkg = require('./package.json');

commander
    .version(pkg.version);

commander
    .command('init')
    .description('initialize a new project')
    .action( () => {
        commands.initProject();
    });

commander
    .command('start')
    .description('start a local server for developping')
    .action( () => {
        commands.startServer();
    });

commander.command('create')
    .description('create static source')
    .action(() => {
        commands.createSource();
    });

commander
    .command('pack')
    .description('pack static source')
    .action( () => {
        commands.packSource()
    });

commander.command('upload')
    .description('upload static code')
    .action(() => {
        commands.uploadSource();
    });

commander.command('config')
    .description('cli-tool setting')
    .action(() => {
        commands.configTool();
    });

commander.command('deploy')
    .description('deploy application')
    .action(() => {
        commands.deployServer();
    });

commander.parse(process.argv);
