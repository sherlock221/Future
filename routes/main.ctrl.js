/**
 * Created by sherlock on 15/8/23.
 */
var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");


//微信设置
var WECHAT_SETTING = require("../constants/weChatSetting");
//微信服务
var weChatAuthNet = require("../services/net/weChatAuth.net");

//微信消息
var weChatMessageNet = require("../services/net/weChatMessage.net.js");
//微信通讯录
var WeChatContactNet = require("../services/net/weChatContact.net.js");
//third
var WeChatThirdNet = require("../services/net/weChatThird.net.js");


//定时任务
router.get("/wechat", function (req, res, next) {
    console.log("/ index /");
    console.log(req.session.id);

    //获得微信消息
    //weChatMessageNet.sendText("@all","","",2,"你好我是奥博!").then(function(data){
    //    res.json(data);
    //
    //},function(err){
    //    next(err);
    //});


    //获取部门列表
    //WeChatContactNet.getDepartmentList().then(function(data){
    //    res.json(data);
    //});


    //第三方授权
    WeChatThirdNet.getProviderToken().then(function (data) {
        res.json(data);
    });
    ;

});

module.exports = router;