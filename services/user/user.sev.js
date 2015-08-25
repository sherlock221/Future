var Q  = require("Q");

var UserService = {

    login  : function(userName,passWord){

        var defer = Q.defer();

        var user = {
            userName : userName,
            age      : 20
        };

        var err;

        setTimeout(function(){
            if(1 == 1){
                defer.resolve(user)
            }
            else{
                defer.reject(err);
            }

        },0);



        return defer.promise;
    }

}








module.exports  = UserService;

