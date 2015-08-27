var request = require("request");
var Q = require("Q");
var responseHelper = require("./responseHelper");


/**
 * http 封装request lib
 * @type {{get: Function}}
 */
module.exports = {

    get: function (url, params, option) {

        var defer = Q.defer();

        request.get(url, {
            qs: params
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                defer.resolve(JSON.parse(body));
            }
            else {
                defer.reject(error, response);
            }
        })

        return defer.promise;
    },


    post: function (url, params) {
        var defer = Q.defer();
        request.post(url, {
            body: params,
            json: true

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                defer.resolve(body);
            }
            else {
                defer.reject(error, response);
            }
        })

        return defer.promise;
    },

    /**
     * post微信
     * @param url
     * @param params
     * @returns {*|r.promise|Function|promise}
     */
    postWeChat: function (url, params) {
        url += "?access_token=" + global._access_token;
        var defer = Q.defer();
        request.post(url, {
            body: params,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                //创建模板
                var result = responseHelper.resultData;

                //错误code
                if (body.errcode) {
                    result.rtnCode = body.errcode;
                    result.msg = body.errmsg;
                }
                else {
                    result.rtnCode = "0000000";
                    result.bizData = body;
                }

                defer.resolve(result);

            }
            else {
                defer.reject(error, response);
            }
        })
        return defer.promise;
    }

}

