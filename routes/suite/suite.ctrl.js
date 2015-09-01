var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");
var RedisHelper = require("../../util/redisHelper");
var ResponseHelper = require("../../util/responseHelper");
var StatusHelper = require("../../constants/responseStatus.con");
var wechat = require("wechat-enterprise");

var WeChatThirdNet = require("../../services/net/weChatThird.net.js");


var config = {
    token: 'YzSsVRlr7',
    encodingAESKey: 'AtsMKocAzFm7KiGNHyG3iTbOgwGj8eWzTB2L0QhoXOY',
    corpId: 'tj202a67365d0115d0',
    secret: '2ZJYP1A-KnN7gRMKiQBpJsSq8-_R3qECA1OEUOw6qk7PZCRUzK547Btc07EPfUGa'
};


/**
 * 微信推送suite协议 间隔10分钟
 */
router.post('/receive', wechat(config, function (req, res, next) {
    console.log("推送suite协议");
    console.log("微信obj ", req.weixin);

    if (req.weixin){

        switch(req.weixin.InfoType){
            case "suite_ticket" :
                //存入redis
                RedisHelper.set("suite_ticket",req.weixin);
                break;
            case "change_auth"  :
                console.log("变更授权...");
                break;
            case "cancel_auth"  :
                console.log("取消授权...");
                break;
            default :
                break;
        }
    }

    res.send('success');
}));





/**
 * 授权应用
 */
router.all("/authorize", function (req, res,next) {
    var resData = ResponseHelper.resultData;
    var suiteInfo;

    RedisHelper.get("suite_ticket")
        //获得ticket
        .then(function(wx) {
            suiteInfo = wx;
            if (suiteInfo) {
                return WeChatThirdNet.getSuiteToken(suiteInfo.SuiteId, config.secret, suiteInfo.SuiteTicket)
            }
            else{
                resData.rtnCode = '9000000';
                resData.msg = StatusHelper['9000000'];
                resData.from = "system";
                res.json(resData);
                return Q.reject("wx");
            }
        })
        //获得suit_token
        .then(function (data) {
            return WeChatThirdNet.getPreAuthCode(suiteInfo.SuiteId, data.suite_access_token);
        })
        //获取预授权码
        .then(function (data) {
            console.log("预授权码", data.pre_auth_code);
            resData.from = "wechat";

            if(!data.errcode){
                resData.bizData  = {
                    suite  : suiteInfo,
                    pre_auth_code : data.pre_auth_code

                };
            }
            else{
                resData.msg = data.msg;
                resData.rtnCode = data.errcode;
            }

            res.json(resData);
        })
        //失败
        .fail(function (err) {
            if(err != "wx"){
                next(err)
            }
        });
});


module.exports = router;