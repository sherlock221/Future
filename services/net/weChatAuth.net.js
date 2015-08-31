/**
 * Created by abjia on 15-8-26.
 * 微信认证
 */


var  WECHAT_QY_URL   = require("../../constants/weChatQyUrl.cons");
var  httpHelper      = require("../../util/httpHelper");


var WeChatAuthSev = {

    /**
     * 获得access_token
     * @param corpId
     * @param secret
     * @returns {*}
     */
    getToken : function(corpId,secret){

        var params = {
            corpId : corpId,
            corpsecret : secret
        }

        return httpHelper.getWeChat(WECHAT_QY_URL.getAccessToken,params);
    }





};



module.exports = WeChatAuthSev;