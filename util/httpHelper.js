var  request  = require("request");
var  Q   = require("Q");


/**
 * http 封装request lib
 * @type {{get: Function}}
 */
module.exports = {


    get : function(url,params,option){

        var defer  = Q.defer();

        request.get(url,{
            qs : params
        },function (error, response, body) {
            if (!error && response.statusCode == 200) {
               defer.resolve(body);
            }
            else{
                defer.reject(error,response);
            }
        })

        return defer.promise;
    }

}