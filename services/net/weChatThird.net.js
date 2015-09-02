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

        return httpHelper.postWeChat(WECHAT_QY_URL.third.getProviderToken,params);
    },

    /**
     * 获取预授权码
     * @param suiteId
     * @param suiteSecret
     * @param suiteTicket
     */
    getPreAuthCode : function(suiteId,suiteAccessToken){
        var url =  WECHAT_QY_URL.third.getPreAuthCode+"?suite_access_token="+suiteAccessToken;
        var params = {
            "suite_id": suiteId
            //"appid":""
        }
        return httpHelper.postWeChat(url,params);
    },

    /**
     * 获取应用套件令牌
     * @param suiteId
     * @param suiteSecret
     * @param suiteTicket
     * @returns {*|r.promise|Function|promise}
     */
    getSuiteToken : function(suiteId,suiteSecret,suiteTicket){

        var params = {
            "suite_id":suiteId ,
            "suite_secret": suiteSecret,
            "suite_ticket": suiteTicket
        }
        return httpHelper.postWeChat(WECHAT_QY_URL.third.getSuiteToken,params);
    }



};



module.exports = WeChatThirdSev;