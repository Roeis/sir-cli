'use strict';
let colors = {
    reset : '\x1b[0m',
    bright : '\x1b[1m',
    dim : '\x1b[2m',
    underscore : '\x1b[4m',
    blink : '\x1b[5m',
    reverse : '\x1b[7m',
    hidden : '\x1b[8m',

    fontBlack : '\x1b[30m',
    fontRed : '\x1b[31m',
    fontGreen : '\x1b[32m',
    fontYellow : '\x1b[33m',
    fontBlue : '\x1b[34m',
    fontMagenta : '\x1b[35m',
    fontCyan : '\x1b[36m',
    fontWhite : '\x1b[37m',

    bgBlack : '\x1b[40m',
    bgRed : '\x1b[41m',
    bgGreen : '\x1b[42m',
    bgYellow : '\x1b[43m',
    bgBlue : '\x1b[44m',
    bgMagenta : '\x1b[45m',
    bgCyan : '\x1b[46m',
    bgWhite : '\x1b[47m',
};

let colorApi = {};
let colorsArr = ['black', 'green', 'red', 'yellow', 'blue', 'magenta', 'cyan', 'white'];

function upperCase(str){
    return str.slice(0,1).toUpperCase() + str.slice(1);
}

colorsArr.forEach(color => {
    let fontColor = colors['font'+ upperCase(color)];
    colorApi[color] = str => `${fontColor}${str}${colors.reset}`;
});


module.exports = colorApi;
