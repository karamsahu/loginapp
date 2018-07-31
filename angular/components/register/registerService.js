// <reference path= "lib/angular.min.js"
app.factory('registerService', function () {
    var result = {
        msg: 'Failed to register user',
        success: false,
        data: null,
        error: null
    }
    return {
        registerUser: function (newUser, $http, cb) {
            if (newUser.username == undefined) {
                result.msg = 'Username is required';
                cb(result);
            }

            if (newUser.password == undefined) {
                result.msg = 'Password is required';
                cb(result);
            }

            if (newUser.email == undefined) {
                result.msg = 'Email is required';
                 cb(result);
            } 
            
            if(newUser.cPassword != newUser.password){
                result.msg = 'Password and confirm passowrd does not match.'
                cb(result)
            }
            else {
                // here code goest to save user to datbase
                // we will make http call to backend to register user and 
                // once user is successfully registered contoller will take care.
                var userData = {
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password
                }

                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/register',
                    data: userData
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    result.msg = response.data.msg;
                    result.data = response.data.data;
                    result.success = response.data.success;
                     cb(result);
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    result.msg = response.data.msg;
                    result.data = response.data.data;
                    result.success = response.data.success;
                    cb(result);
                });
            }
        }
    }
});