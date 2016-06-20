angular.module('app')
  .controller('LogoutCtrl', function($location) {
    const auth = this;

    firebase.auth().signOut();
    $location.path('/');

  })
