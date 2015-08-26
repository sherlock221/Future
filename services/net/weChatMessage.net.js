/**
 * Created by abjia on 15-8-26.
 * 微信消息
 */


var  WECHAT_QY_URL   = require("../../constants/weChatQyUrl.cons");
var  httpHelper      = require("../../util/httpHelper");


var WeChatMessageSev = {

    send : function(params){
        return httpHelper.post(WECHAT_QY_URL.sendMessage,params);
    },


    /**
     * 发送文字消息
     * @param touser
     * @param toparty
     * @param totag
     * @param agentid
     * @param content
     */
    sendText : function(touser,toparty,totag,agentid,content){
        var params = {
            touser : touser,
            toparty : toparty,
            totag : totag,
            agentid : agentid,
            msgtype : "text",
            text : {
                content : content
            },
            "safe":"0"
        }
        return this.send(params);
    }


};



module.exports = WeChatMessageSev;