/**
 * Created by sherlock on 15/8/23.
 */
var express = require('express');
var router = express.Router();
var Q = require("Q");
var moment = require("moment");

var jwt =  require('express-jwt');



/**
 * 登录系统
 */
router.all("/login", function (req, res) {
    console.log("/ login ctrl... /");

    var userName = req.query.userName;
    var passWord = req.query.passWord;

    if(!userName || !passWord){
        return res.send(401);
    }

    var user  = {
        userName : userName,
        passWord : passWord
    }

    var token = jwt.sign(user, "locak221b", { expiresInMinutes: 60 });

    res.json({
        token : token
    });

});


/**
 * 登出
 */
router.all("loginOut",function(req,res){
   console.log("loginOut");
});





module.exports = router;