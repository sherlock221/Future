/**
 * db初始化
 * @type {*|exports|module.exports}
 */

var config    = require("../config");
var express_session = require('express-session');
var RedisStore = require('connect-redis')(express_session); //redis存储


var redisInit = function(app){
    //创建redis链接
    var store =  new RedisStore(config.redis);
    //监听redis 异常
    store.client.on("error", function (err) {
        console.error("Error " + err);
    });

    //redis连接
    store.client.on("connect", function () {
        console.log("connect redis success...");
    });

    //设置redis 存储session
    app.use(express_session({
        store: store,
        secret: 'keyboard cat'
    }))

    //redis 异常捕获
    app.use(function (req, res, next) {
        if (!req.session) {
            return next(new Error('redis 出现错误异常!'));
        }
        next();
    });
}


var mysqlInit = function(){
    console.log("mysql init..");

}


module.exports = {
    redis : redisInit,
    mysql : mysqlInit
};