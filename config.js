/**
 * mysql 配置
 */

var redis = {};
var mysql = {};


//开发环境
if (APP_ENV == "development") {
    redis = {
        "host": "localhost",
        "port": "6379",
        "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天 单位秒
        //disableTTL  禁用设置的 TTL
        //db         使用第几个数据库
        //pass       Redis数据库的密码
        //prefix     数据表前辍即schema, 默认为 "sess:"
        prefix: "common:",
        db: 1
    }

    mysql = {}
}

//正式环境
else {
    redis = {
        "host": "10.10.68.15",
        "port": "6379",
        "pass": "zhiliao",
        "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天 单位秒
        prefix: "common:",
        db: 1
    }


}


module.exports = {
    redis: redis,
    mysql: mysql
}