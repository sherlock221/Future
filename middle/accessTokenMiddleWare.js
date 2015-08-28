var db  = require("../start/db");
var redis = require("redis");

var redisClient = db.redis.client;

//微信设置
var WECHAT_SETTING  = require("../constants/weChatSetting");
//微信服务
var weChatAuthNet = require("../services/net/weChatAuth.net");


module.exports = function(req,res,next){




    redisClient.get("access_token", function(err, reply) {
        console.log("access_token",reply);

        if(!reply){

            console.log("获得新的access_token...");

            weChatAuthNet.getToken(WECHAT_SETTING.CorpID,WECHAT_SETTING.Secret)
                .then(function(data){

                    if(!data.errcode){
                        //全局访问access_token
                        global._access_token =  data.access_token;
                        console.log(data.access_token);
                        //设置access_token
                        redisClient.set("access_token",data.access_token,redis.print);
                        next();
                    }
                    else{
                        res.json(data);
                    }

                })
                .fail(function(err){
                    next(err);
                });
        }
        else{
            //全局访问access_token
            global._access_token = reply;
            console.log("缓存access_token...");
            next();
        }
    });



}

