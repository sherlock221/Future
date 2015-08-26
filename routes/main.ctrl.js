/**
 * Created by sherlock on 15/8/23.
 */
var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");


//微信设置
var WECHAT_SETTING  = require("../constants/weChatSetting");
//微信服务
var weChatAuthNet = require("../services/net/weChatAuth.net");

//微信消息
var weChatMessageNet = require("../services/net/weChatMessage.net.js");



//定时任务
router.get("/wechat", function (req, res) {
    console.log("/ index /");
    console.log(req.session.id);

    //获得微信消息
    weChatMessageNet.sendText("@all","","",0,"你好我是奥博!").then(function(data){

        console.log(data);

    },function(err){
        console.log(err);
    });



    res.json({"session": req.session.id});

});

module.exports = router;