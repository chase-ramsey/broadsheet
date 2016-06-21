angular.module('app')
  .controller('ProfileCtrl', function(AuthFactory) {
    const profile = this;
    profile.user = AuthFactory.getLoggedUser();


  })
