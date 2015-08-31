var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");
var db  = require("../../start/db");
var redis = require("redis");

var wechat = require("wechat-enterprise");

var WeChatThirdNet = require("../../services/net/weChatThird.net.js");


var config = {
    token: 'YzSsVRlr7',
    encodingAESKey: 'AtsMKocAzFm7KiGNHyG3iTbOgwGj8eWzTB2L0QhoXOY',
    corpId: 'tj202a67365d0115d0',
    secret: '2ZJYP1A-KnN7gRMKiQBpJsSq8-_R3qECA1OEUOw6qk7PZCRUzK547Btc07EPfUGa'
};


//推送suite协议 间隔10分钟
router.post('/receive', wechat(config, function (req, res, next) {
    console.log("推送suite协议");
    console.log("微信obj ", req.weixin);

    if(req.weixin)
        //存入redis
        db.redis.set("suite_ticket", req.weixin.SuiteTicket,redis.print);

    res.writeHead(200);
    res.end('success');
}));



//获取预授权码
//router.post("/login", function (req, res) {
//    WeChatThirdNet
//        .getSuiteToken(wx.SuiteId, config.secret, wx.SuiteTicket)
//        //获取令牌
//        .then(function (data) {
//            return WeChatThirdNet.getPreAuthCode(wx.SuiteId, data.suite_access_token);
//        })
//        //获取预授权码
//        .then(function (data) {
//            console.log("预授权码",data.pre_auth_code);
//            //存入redis
//
//        })
//        .fail(function (err) {
//            next(err);
//        });
//
//});


module.exports = router;