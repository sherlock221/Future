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
               defer.resolve(JSON.parse(body));
            }
            else{
                defer.reject(error,response);
            }
        })

        return defer.promise;
    },

    post : function(url,params){



        url += "?access_token="+global._access_token;

        var defer  = Q.defer();

        console.log(params);

        request.post(url,{
            'content-type': 'application/json',
            body : params,
            json : true

        },function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                defer.resolve(body);
            }
            else{
                defer.reject(error,response);
            }
        })

        return defer.promise;
    }

}