var app = angular.module('MyApp', ['ngRoute', 'angular-jwt']);

app.config(['$routeProvider', '$httpProvider', 'jwtInterceptorProvider',

  function ($routeProvider, $httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = function () {
      return localStorage.getItem('jwt-token');
    };
    $httpProvider.interceptors.push('jwtInterceptor');

  $routeProvider
    .when('/',{
      templateUrl: 'home.html'
    })
    .when('/sun',{
      templateUrl: 'sun.html',
      controller: 'sunCtrl'
    })
    .when('/saturn',{
      templateUrl: 'saturn.html',
      controller: 'sunCtrl'
    })

  }]);

app.controller('authCtrl', function AuthController($scope, flAuthService) {
  
  $scope.username = 'Unknown person';
  $scope.isLoggedIn = false;
  
  $scope.login = function () {
    if (flAuthService.login('user', 'password')) {
      $scope.isLoggedIn = true;
      $scope.username = 'Logged in user';
    }
  };
  
  $scope.logout = function () {
    flAuthService.logout();
    $scope.isLoggedIn = false;
    $scope.username = 'Anonymous';
  };
});

app.controller('sideMenuCtrl', ['$scope', '$http', 'classFactory', function ($scope, $http, classFactory) {
  $http.get('sidemenu.json')
    .success(function (data) {
      $scope.viewModel = data.menu;
  });
  $scope.classFactory = classFactory; 
}]);

app.controller('homePageCtrl', ['$scope', '$http', 'classFactory', 'dateFactory', function ($scope, $http, classFactory, dateFactory) {
 $scope.classFactory = classFactory;
 $scope.dateFactory = dateFactory;

 $http.get("http://ip-api.com/json/?callback=")
  .success(function(data) {
     $scope.ip = data.query;         
    });
}]);

app.controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
  // $http.get('table-tripsbook.json')
  //   .success(function (data) {
  //     $scope.list = data;
  // });

  // $http.get('table-header.json')
  //   .success(function (data) {
  //     $scope.headers = data;
  // });

  $scope.innerHeight = window.innerHeight; 
}]);

app.controller('sunCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.sun = "Sun is a most star"
  
}]);


app.service('flAuthService', function ($http, $window, jwtHelper) {
  var self = this;
  var jwtTokenKey = 'jwt-token';
  
  self.login = function(user, password) {
    var loginResult = $http.post('api/auth/login', {
      username: user,
      password: password
    });
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZWxsbO-jv2xsbO-jvyIsImFkbWluIjp0cnVlfQ.NCPM3vNwuvJGMIjR0csEFQDrSLcjm5P7ORumVq4ezmo';;

    loginResult.then(
      function (response) { 
        token = response.data;
      },
      function (response) { 
        console.log(response);
      });
    
    if (token && !jwtHelper.isTokenExpired(token)) {
      $window.localStorage[jwtTokenKey] = token;
      return true;
    }
    else {
      console.error('Token is expired');
      return false;
    } 
  }
  
  self.logout = function() {
    $window.localStorage.removeItem(jwtTokenKey);
  }
});