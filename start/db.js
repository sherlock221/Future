/**
 * db初始化
 * @type {*|exports|module.exports}
 */

var config    = require("../config");
var express_session = require('express-session');
var RedisStore = require('connect-redis')(express_session); //redis存储



var store,mysql;

var redisInit = function(){

    //创建redis链接
    store =  new RedisStore(config.redis);
    //监听redis 异常
    store.client.on("error", function (err) {
        console.error("Error " + err);
    });

    //redis连接
    store.client.on("connect", function () {
        console.log("connect redis success...");
    });

}



var mysqlInit = function(){
    console.log("mysql init..");

}

redisInit();
mysqlInit();


module.exports = {
    redis : store,
    mysql : mysql
};