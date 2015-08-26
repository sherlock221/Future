/**
 * Created by sherlock on 15/8/23.
 */
var express = require('express');
var router = express.Router();
var Q = require("Q");


/**
 * 登录系统
 */
router.post("/login", function (req, res) {
    console.log("/ login ctrl... /");

    var userName = req.params.userName;
    var passWord = req.params.passWord;

    //查找用户信息，看是否满足登陆条件
    var user = findUser(username, password);

    if(user){
        //成功获取用户对象
        req.session.regenerate(function(){
            req.user = user;
            req.session.userId = user.id;
            req.session.save();  //保存一下修改后的Session

            res.redirect('/account');
        });
    }
    else{
        //用户信息不符合，登陆失败
    }

});


/**
 * 登出
 */
router.post("loginOut",function(req,res){
    req.clearCookie('connect.sid');
    req.user = null;

    req.session.regenerate(function(){
        //重新生成session之后后续的处理
        res.redirect('/signin');
    })
});





module.exports = router;