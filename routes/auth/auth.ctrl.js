/**
 * Created by sherlock on 15/8/23.
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var app = require("../../app");
var jsonwebtoken = require("jsonwebtoken");
var tokenManager  = require("../../util/tokenManager");


/**
 * 用户业务
 * @type {*|require}
 */
var userService = new require("../../services/user/user.sev");
var redisClient  = require("../../start/db").redis;



/**
 * 登录系统
 */
router.get("/login", function (req,res) {

    var userName = req.query.userName;
    var passWord = req.query.passWord;


    if (!userName || !passWord) {
        return res.send(401);
    }

    //登录用户
    userService
        .login(userName, passWord)
        .then(function (user) {

            var token = jsonwebtoken.sign(user, "lock221b", {expiresInMinutes: tokenManager.TOKEN_EXPIRATION });

            //存入redis
            redisClient.set(token,"");

            return res.json({token:token});
        })
        .fail(function (err) {
            console.log(err);
        });

});


router.get("/logout",function(req,res){
    if (req.user) {

        tokenManager.expireToken(req.headers);
        delete req.user;
        return res.send(200);
    }
    else {
        return res.send(401);
    }
});

/**
 * 注册
 */
router.get("/register",function (req,res) {
        console.log("register...");


    res.json({"111":111});
});


module.exports = router;