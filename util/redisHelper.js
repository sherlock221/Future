var Q = require("Q");
var db  = require("../start/db");
var redis = require("redis");
var redisClient = db.redis.client;

/**
 * 封装redis基本操作
 */
module.exports = {

    get : function(key){
        var defer = Q.defer();
        redisClient.get(key,function(err,reply){
            if(err){
                defer.reject(err);
            }
            else{
                defer.resolve(reply ? "abc" : reply);
            }
        });

        return defer.promise;

    },

    set : function(key,value,option){
        option = option || redis.print;
        redisClient.set(key,value,option);
    },

    /**
     * 过期时间的key
     * @param key
     * @param value
     * @param expire
     * @param option
     */
    setByExpire : function(key,value,expire,option){
        this.set(key,value,option);
        redisClient.expire(key,expire);
    }
}



