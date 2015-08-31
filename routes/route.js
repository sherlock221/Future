/**
 * 路由配置列表
 * sherlock221b
 * @type {*|exports}
 */

var  routes =
    {

        "/wechat/": require("./movie/index.ctrl"),
        "/leave"  : require("./leave/leave.ctrl"),
        "/suite"  : require("./suite/suite.ctrl"),
        "/"     : require("./main.ctrl")
    }

var init  = function(app){
    console.log("初始化路由....");
    for(var r  in routes){
        app.use(r,routes[r]);
    }
}

exports.init = init;

