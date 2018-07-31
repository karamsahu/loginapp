// <reference path= "lib/angular.min.js"

app.factory('loginService', function () {
    var result = {
        msg: 'Failed to register user',
        success: false,
        data: null,
        error: null
    }
    return {
        validateLogin: function (username, password, $http, cb) {
            var result = {
                msg : 'Login failed, Invalid credentials.',
                success : false
            }
    
            if (username == null || password == null) {
                result.msg =  "Either username or passord is null"
                result.success = false
                cp(result);
            }
            else {
                // here code goest to save user to datbase
                // we will make http call to backend to register user and 
                // once user is successfully registered contoller will take care.
                var loginData = {
                    username: username,
                    password: password
                }

                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/login',
                    data: loginData
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
                    result.msg = response.msg;
                    result.data = response.data;
                    result.success = response.success;
                    cb(result);
                });
            }
        }
    }
});