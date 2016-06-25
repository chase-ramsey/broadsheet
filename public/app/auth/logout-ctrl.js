angular.module('app')
  .controller('LogoutCtrl', function($location, $timeout, AuthFactory) {
    const auth = this;

    AuthFactory.logoutUser()
      .then(() => {
        $timeout($location.path('/'));
      })

  })
