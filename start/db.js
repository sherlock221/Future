/**
 * db初始化
 * @type {*|exports|module.exports}
 */
var Redis = require('ioredis');
var config    = require("../config");


//创建一个redis连接
var redisClient = new Redis(config.redis);


//监听redis 异常
redisClient.on("error", function (err) {
    console.error("Error " + err);
});

//redis连接
redisClient.on("connect", function () {
    console.log("connect redis success...");
});




module.exports = {
    redis : redisClient
};