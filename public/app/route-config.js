angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'app/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'auth'
      })
  })
