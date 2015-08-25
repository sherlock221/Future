/**
 * Created by abjia on 15-8-25.
 * auth 验证中间件
 */


var jwt =  require('express-jwt');

module.exports = function(req, res, next) {

    //支持3种方式传递token
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if(token){
        try {
            var decoded = jwt.decode(token, "lock221b");


            //token已经过期
            if(decoded.exp <= Date.now()){
               return  res.end('Access token has expired', 400);
            }

            req.user  =  {
                id : decoded.iss
            }

        } catch (err) {
            return next();
        }
    }
    else{

        return next();
    }

};