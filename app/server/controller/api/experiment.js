'use strict';

'use strict';
const pkg = require('package.json');
const {spawn} = require('child_process');
const {key: deployKey} = require('config/deploy');

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


module.exports = {

    async post(ctx, next){
        ctx.type = 'json';

        let {secret} = ctx.request.body;
        let result;
        if(secret === deployKey){
            // force restart
            cmd.run('git pull');
            cmd.run(`pm2 restart ${pkg.name}`);
            result = 'ok';
        }else{
            result = 'denied';
        }
        ctx.body = {result};
    }
}
