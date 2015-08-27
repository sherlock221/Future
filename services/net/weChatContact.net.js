/**
 * Created by abjia on 15-8-26.
 * 微信通讯录
 */


var  WECHAT_QY_URL   = require("../../constants/weChatQyUrl.cons");
var  httpHelper      = require("../../util/httpHelper");


var WeChatContactSev = {

     getDepartmentList :  function(id){
        var params = {
            id : id
        }

        return httpHelper.getWeChat(WECHAT_QY_URL.contact.department.getDepartments,params);
    }



};



module.exports = WeChatContactSev;