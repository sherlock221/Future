var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");
var RedisHelper = require("../../util/redisHelper");
var ResponseHelper = require("../../util/responseHelper");
var  WECHAT_QY_URL   = require("../../constants/weChatQyUrl.cons");
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
                //序列化
                var wechatSer = JSON.stringify(req.weixin);
                //存入redis
                RedisHelper.set("suite_ticket",wechatSer);
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
 * 授权结果(获得永久授权码)
 */
router.get("/authCallBack",function(req,res,next){

    var authCode = req.query.auth_code;
    var expiresIn = req.query.expires_in;
    var state = req.query.state;

    var suiteInfo;

    RedisHelper
        .get("suite_ticket")
        .then(function(reply){
            if(reply){
                //反序列化
                suiteInfo = JSON.parse(reply);
                //获得永久授权码
                return WeChatThirdNet.getPermanentCode(suiteInfo.SuiteId,authCode,suiteInfo.suiteAccessToken);
            }
            else{
                return responseSuiteExpire(res);
            }
        })
        .then(function(data){
            console.log(data);
            //成功
            if(data.rtnCode == RESPONSE_STATUS.SUCCESS){
            }

            res.send("success");

        })
        .fail(function(err){
            next(err);
        });


});


/**
 * 授权应用
 */
router.all("/authorize", function (req, res,next) {

    var suiteInfo;

    RedisHelper.get("suite_ticket")
        //获得ticket
        .then(function(wx) {
            if (wx) {
                //反序列化
                suiteInfo = JSON.parse(wx);
                return WeChatThirdNet.getSuiteToken(suiteInfo.SuiteId, config.secret, suiteInfo.SuiteTicket)
            }
            else{
                var resData = new ResponseHelper.resultData();
                resData.rtnCode = RESPONSE_STATUS.TICKET_EXPIRE;
                resData.msg = "suite_ticket已经过期!";
                resData.from = "system";
                res.json(resData);
                return Q.reject("wx");
            }
        })
        //获得suit_token
        .then(function (data) {
            //存入suite_access_token
            suiteInfo.suiteAccessToken = data.bizData.suite_access_token;
            RedisHelper.set("suite_ticket",JSON.stringify(suiteInfo));
            return WeChatThirdNet.getPreAuthCode(suiteInfo.SuiteId, data.bizData.suite_access_token);
        })
        //获取预授权码
        .then(function (data) {
            data.from = "wechat";
            if(data.rtnCode == RESPONSE_STATUS.SUCCESS){
                console.log("预授权码", data.bizData.pre_auth_code);
                var redirect_uri = WECHAT_QY_URL.third.redirectUri;
                var state = "1";
                data.bizData = {
                    url : _packageAuthorizeUrl(suiteInfo.SuiteId,data.bizData.pre_auth_code,redirect_uri,state)
                }
            }
            res.json(data);
        })
        //失败
        .fail(function (err) {
            if(err != "wx"){
                next(err)
            }
        });
});




var responseSuiteExpire = function(res){
    var resData = new ResponseHelper.resultData();
    resData.rtnCode = RESPONSE_STATUS.TICKET_EXPIRE;
    resData.msg = "suite_ticket已经过期!";
    resData.from = "system";
    res.json(resData);
    return Q.reject("wx");
}

/**
 * 封装授权的url地址
 * @param suite_id
 * @param pre_auth_code
 * @param redirect_uri
 * @param state
 * @returns {string}
 * @private
 */
var  _packageAuthorizeUrl = function(suite_id,pre_auth_code,redirect_uri,state){
    return WECHAT_QY_URL.third.authPage + "?suite_id="+suite_id+"&pre_auth_code="+pre_auth_code+"&redirect_uri="+redirect_uri+"&state="+state;
}


module.exports = router;