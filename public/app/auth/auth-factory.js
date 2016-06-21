angular.module('app')
  .factory('AuthFactory', function() {
    let loggedUser = null;

    return {

      loginUser: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      },

      logoutUser: () => {
        return firebase.auth().signOut();
      },

      registerUser: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
      },

      createUsername: (user, username) => {
        return user.updateProfile({
          displayName: username
        })
      },

      setLoggedUser: (user) => {
        loggedUser = user;
      },

      getLoggedUser: () => {
        return loggedUser;
      }

    }
  })
