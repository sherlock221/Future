/**
 * Created by abjia on 15-8-26.
 * 微信第三方登录授权
 */


var  WECHAT_QY_URL   = require("../../constants/weChatQyUrl.cons");
var  httpHelper      = require("../../util/httpHelper");


var WeChatThirdSev = {

    /**
     * 获得第三方授权token
     * @param corpId
     * @param secret
     * @returns {*}
     */
    getProviderToken : function(corpId,secret){

        var params = {
            corpid : corpId,
            provider_secret : secret
        }

        return httpHelper.get(WECHAT_QY_URL.third.getProviderToken,params);
    }



};



module.exports = WeChatThirdSev;