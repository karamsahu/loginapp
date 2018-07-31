var app = angular.module("loginApp", ['ngRoute']);


// using routes to control view rendering 
app.config(function ($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'components/login/login.html',
			controller: 'loginController'
		})
		.when('/register', {
			templateUrl: 'components/register/register.html',
			controller: 'registerController'
		})
		.when('/dashboard', {
			templateUrl: 'components/dashboard/dashboard.html',
			controller: 'dashboardController',
		})
		.otherwise('/login', {
			redirectTo: 'components/login/login.html'
		})
});

// LOGIN Contoller
app.controller("loginController", function ($scope, $http, $rootScope, $location, loginService) {
	// validate login credentials and return result object contains message and status
	$scope.login = function () {
		loginService.validateLogin($scope.username, $scope.password, $http, function (result) {
			if(result.success == undefined){
				$rootScope.loginResult.success = false;
				$rootScope.loginResult.msg = 'No response recived from server.';
			}
			
			if (result.success == true) {
				$rootScope.loginResult = result.data;
				$rootScope.loginResult.islogin = true;
				$location.path('dashboard');
			} else {
				$rootScope.loginResult = result;
			}
		});
	}

	// visit register page
	$scope.visitRegister = function () {
		$location.path('register')
	}
});


// Register Controller
app.controller("registerController", function ($scope, $rootScope, $location, registerService, $http) {
	// visit login page when user click login button from the register page
	$scope.visitLogin = function () {
		$location.path('login');
	}
	$scope.register = function () {
		var status = registerService.registerUser($scope.newUser, $http, function (status) {
			if (status && status.data) {
				$scope.registerResponse = status.data;
				$location.path('dashboard') // naviage to dashboard upon successfull login
				$rootScope.loginResult = status.data;
			} else {
				$scope.registerResponse = status;
			}
		});
	}
});

// Dashboard controller
app.controller("dashboardController", function ($scope, $rootScope, $location, dashboardService) {
	$scope.logout = function () {
		dashboardService.logout($rootScope, function(result){
			$location.path('login') // send user to login page after logout
		});
	}
});

