angular.module('app')
  .factory('AuthFactory', function() {
    let loggedUser = null;

    return {

      setLoggedUser: (user) => {
        loggedUser = user;
      },

      getLoggedUser: () => {
        return loggedUser;
      }

    }
  })
