/**
 * 起风了电影
 * abjia
 * @type {*|exports}
 */

var express = require('express');
var router = express.Router();

/**
 * 起风了
 */
router.get("/index",function(req,res){
    res.render("movie/index");
});


router.post("/test",function(req,res){
    res.json({"abc" : "123"});
});

router.get("/detail",function(req,res){
    res.render("movie/detail" );
});



module.exports = router;