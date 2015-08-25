/**
 * 路由配置列表
 * sherlock221b
 * @type {*|exports}
 */

var jwt =  require('express-jwt');

var  routes =
    {
        "/auth" : require("./auth/auth.ctrl"),
        "/movie": require("./movie/index.ctrl"),
        "/"     : require("./main.ctrl")
    }


var init  = function(app){
    console.log("初始化路由....");
    for(var r  in routes){
        app.use(r,routes[r]);
    }


}

exports.init = init;

