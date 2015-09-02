var ResultData = function (bizData,rtnCode,msg,from) {
    this.bizData = bizData || {};
    this.rtnCode = rtnCode || RESPONSE_STATUS.SUCCESS;
    this.msg = msg || "";
    this.from = from || "";

}

exports.resultData = ResultData;

