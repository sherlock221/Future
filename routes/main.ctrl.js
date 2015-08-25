/**
 * Created by sherlock on 15/8/23.
 */
var express = require('express');
var router = express.Router();
var Q = require("Q");
var fs = require("fs");


//封装promise
var readFile = function (fileName) {
    var defer = Q.defer();
    fs.readFile(fileName, function (err, data) {
        if (!err) {
            defer.resolve(data.toString());
        }
        else {
            defer.reject(err);
        }

    });

    return defer.promise;
}


//cps
var cpsReadFile = function(fileName){
    return Q.nfcall(fs.readFile,fileName,'utf-8');
}


router.get("/", function (req, res) {
    console.log("/ index /");
    console.log(req.session.id);

    res.json({"session": req.session.id});

});

module.exports = router;