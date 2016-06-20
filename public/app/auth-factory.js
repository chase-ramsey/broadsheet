angular.module('app')
  .factory('AuthFactory', function() {
    let loggedUser = null;

    return {

      loginUser: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      },

      setLoggedUser: (user) => {
        loggedUser = user;
      },

      getLoggedUser: () => {
        return loggedUser;
      }

    }
  })
