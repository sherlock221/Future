/**
 * mysql 配置
 */
var mysql =  {
    "host": "127.0.0.1",
    "port": "6379",
    "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天 单位秒
    //disableTTL  禁用设置的 TTL
    //db         使用第几个数据库
    //pass       Redis数据库的密码
    //prefix     数据表前辍即schema, 默认为 "sess:"
    prefix : "common:",
    db     : 2

}

var redis =  {
    "host": "10.10.68.15",
    "port": "6379",
    "pass" : "zhiliao",
    "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天 单位秒
    //disableTTL  禁用设置的 TTL
    //db         使用第几个数据库
    //pass       Redis数据库的密码
    //prefix     数据表前辍即schema, 默认为 "sess:"
    prefix : "common:",
    db     : 1

}


module.exports = {
    redis : redis,
    mysql : mysql
}