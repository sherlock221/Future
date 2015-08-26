/**
 * cors跨域中间件
 * Created by abjia on 15-8-25.
 */


var corsInit  = function(app){

    //设置跨域访问
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1');
        next();
    });
}


module.exports = {
    init : corsInit
}

