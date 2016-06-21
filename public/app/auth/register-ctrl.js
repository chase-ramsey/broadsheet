angular.module('app')
  .controller('RegisterCtrl', function($location, $timeout, $http, AuthFactory, BASE_API) {
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
                $http.post(`${BASE_API}/profiles.json`, {
                  uid: res.uid
                })
                .then(console.log)
                .catch(console.log);
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
