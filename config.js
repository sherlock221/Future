/**
 * mysql 配置
 */
var mysql =  {

}

var redis =  {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'auth',
    db: 0
}


module.exports = {
    redis : redis,
    mysql : mysql
}