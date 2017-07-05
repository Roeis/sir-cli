'use strict';

// const {spawn} = require('child_process');
const spawn = require('cross-spawn');

let cmd = {
    run(code, option) {
        let options = {
                env: Object.assign(process.env, option),
                stdio: 'inherit'
            },
            [
                command, ...args
            ] = code.split(' ');

        let ps = spawn(command, args, options);

        ps.stdout && (ps.stdout.on('data', data => {
            console.log(`${data}`);
        }));

        ps.stderr && (ps.stderr.on('data', data => {
            console.log(`${data}`);
        }));

        ps.on('close', code => {
            console.log(`child process exited with code ${code}`);
        });
    }
};

module.exports = cmd;
