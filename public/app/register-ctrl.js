angular.module('app')
  .controller('RegisterCtrl', function($location, $timeout, AuthFactory) {
    const auth = this;

    auth.loginForm = false;

    // firebase.auth().onAuthStateChanged((res) => {
    //   if (res) {
    //     $timeout($location.path('/'))
    //   }
    // })

    auth.register = (username, email, password) => {
      AuthFactory.registerUser(email, password)
        .then(() => {
          $timeout(() => {
            AuthFactory.loginUser(email, password)
              .then((res) => {
                AuthFactory.createUsername(res, username)
                  .then(() => {
                    $timeout(() => {
                      $location.path('/')
                    })
                  });
              });
          })
        })
    }

  })
