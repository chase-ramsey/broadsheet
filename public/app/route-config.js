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
      .when('/register', {
        templateUrl: 'app/login.html',
        controller: 'RegisterCtrl',
        controllerAs: 'auth'
      })
      .when('/logout', {
        template: '',
        controller: 'LogoutCtrl',
        controllerAs: 'auth'
      })
      .when('/profile/:username', {
        templateUrl: 'app/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
  })
