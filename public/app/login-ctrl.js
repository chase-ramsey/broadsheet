angular.module('app')
  .controller('LoginCtrl', function($location) {
    const auth = this;

    auth.loginForm = true;

    auth.login = (email, password) => {
      firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
          $location.path('/');
        })
        .catch(console.log);
    }

  })
