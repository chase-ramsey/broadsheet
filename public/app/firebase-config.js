angular.module('app')
  .config(() => {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA3jd-g2KqgxMblPKSqQsIIhbT-c762-YE",
      authDomain: "codename-mercury.firebaseapp.com",
      databaseURL: "https://codename-mercury.firebaseio.com",
      storageBucket: "",
    };
    firebase.initializeApp(config);
  })
  .constant('BASE_API', 'https://codename-mercury.firebaseio.com')
