var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");


//接受微信套件 回调
router.post("/receive", function (req, res, next) {
    console.log("/ from wechat  receive... /");

    var msg_signature = req.query.msg_signature;
    console.log(msg_signature);


    //var dev_msg_signature  = sha1(sort(token、timestamp、nonce、msg_encrypt));

    res.json("dd");
});

var load = function (stream, callback) {
    // support content-type 'text/xml' using 'express-xml-bodyparser', which set raw xml string
    // to 'req.rawBody'(while latest body-parser no longer set req.rawBody), see
    // https://github.com/macedigital/express-xml-bodyparser/blob/master/lib/types/xml.js#L79
    if (stream.rawBody) {
        callback(null, stream.rawBody);
        return;
    }

    var buffers = [];
    stream.on('data', function (trunk) {
        buffers.push(trunk);
    });
    stream.on('end', function () {
        callback(null, Buffer.concat(buffers));
    });
    stream.once('error', callback);
};


module.exports = router;