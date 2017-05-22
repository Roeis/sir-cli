'use strict';

const path   = require('path');
const log4js = require('log4js');
const moment = require('moment');

/**
 * 日志记录
 * log4js https://github.com/nomiddlename/log4js-node
 *
 */

/**
 * 取客户端IP
 */
const getClientIP =  req => {
    let clientIP = req.headers['x-forwarded-for'] ||
        req.connection && req.connection.remoteAddress ||
        req.connection && req.connection.socket && req.connection.socket.remoteAddress ||
        req.socket && req.socket.remoteAddress;

    if (clientIP) {
        clientIP = clientIP.replace(/\:\:ffff\:/, '');
        if (clientIP.indexOf(',') !== -1) {
            clientIP = clientIP.substr(0, clientIP.indexOf(","));
        }
    }
    return clientIP;
}

/**
 * 取本机IP，服务器
 */
const getServerIP = () => {

    let os = require('os');

    let ifaces = os.networkInterfaces();

    let ips = Object.keys(ifaces).map(key => {

        let ipv4s = ifaces[key].filter(item => {
            return /ipv4/i.test(item.family);
        });

        return ipv4s && ipv4s.length ? ipv4s[0] : null;
    }).filter(item => {
        return item && !item.internal
    });

    return ips && ips.length ? ips[0].address : '';

}


/**
 * 生成file Appender
 * @param  {String} type     [description]
 * @param  {String} filename [description]
 * @return {Object}          [description]
 */
const generateAppender = (type, filename) => {

    let fileInfo = path.parse(filename);

    return {
        type: 'dateFile',
        filename: `${fileInfo.dir}/`,
        pattern: fileInfo.name + '-yyyy-MM-dd-' + type + fileInfo.ext,
        alwaysIncludePattern: true,
        category: type,
        layout: {
            type: 'pattern',
            pattern: '%m'
        }
    }
}

/**
 * 生成访问日志
 * @param  {[type]} ctx [description]
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */
const generateAccessLog = (ctx, opt) => {
    let req = ctx.request,
        res = ctx.response,
        serverIP = getServerIP(),
        clientIP = getClientIP(req),
        requestLength = req.get('content-length'),
        responseLength = res.get('content-length');

    opt = opt || {};

    return {
        logtime: moment().format(),
        project: 'node',
        method: req.method,
        host: req.headers.host,
        path: req.path,
        query: JSON.stringify(req.query),
        ua: req.headers['user-agent'],
        referer: req.headers.referrer || req.headers.referer,
        status: res.status,
        response_time: opt.responseTime || 0,
        request_id: ctx.state.requestId || ''
    }
}

/**
 * 生成Node服务日志, 应用层
 * @param  {[type]} ctx [description]
 * @param  {[type]} opt [description]
 * @return {[type]}     [description]
 */

const generateNodeLog = (ctx, err, type) => {

    let req = ctx.request,
        res = ctx.response;

    return {
        logtime: moment().format(),
        project: 'node',
        method: req.method,
        host: req.headers.host,
        path: req.path,
        query: JSON.stringify(req.query),
        type: type,
        message: err || '',
        request_id: ctx.state.requestId || ''
    }
}



const log = opt => {

    let env = process.env.NODE_ENV;
    let appenders = [];

    let filename = opt && opt.filename || 'log/logstash.log';

    let accessAppender = generateAppender('web', filename);
    let errorAppender = generateAppender('node', filename);


    appenders.push(accessAppender);
    appenders.push(errorAppender);

    if(/local|development/i.test(env)){
        appenders.push({ type: 'console' });
    }

    log4js.configure({
        appenders: appenders,
        replaceConsole: false
    });

    return (ctx, next) => {

        let nodeLogger = log4js.getLogger('node');
        let webLogger = log4js.getLogger('web');

        /**
         * add access log method
         * @type {Object}
         */
        ctx.log = {
            access(opt){
                let message = generateAccessLog(ctx, opt);
                message = JSON.stringify(message);
                webLogger.info(message);
            }
        };
        /**
         * override original log method
         * @type {[type]}
         */
        ['trace', 'debug', 'error', 'warn', 'fatal'].forEach(item => {
            ctx.log[item] = opt => {
                let message = generateNodeLog(ctx, opt, item);
                message = JSON.stringify(message);
                nodeLogger[item](message);
            }
        });

        return next();
    }
}


module.exports = log;
