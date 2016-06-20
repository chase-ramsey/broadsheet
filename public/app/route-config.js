angular.module('app')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
  })
