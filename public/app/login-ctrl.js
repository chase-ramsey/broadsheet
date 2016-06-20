angular.module('app')
  .controller('LoginCtrl', function($location, $timeout, AuthFactory) {
    const auth = this;

    auth.loginForm = true;

    auth.login = (email, password) => {
      AuthFactory.loginUser(email,password)
        .then(() => {
          $timeout($location.path('/'));
        });
    }

  })
