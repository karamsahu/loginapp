app.factory('dashboardService', function () {
    return {
        logout: function ($rootScope, cb) {
        	$rootScope.loginResult = {};
			cb($rootScope.loginResult.isLogin = false)
       }
    }
})