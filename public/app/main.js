angular.module('app', ['ngRoute'])
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
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        template: '',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
  })
  .constant('BASE_API', 'https://codename-mercury.firebaseio.com/')
  .controller('MainCtrl', function($scope, FeedFactory) {
    const main = this;

    main.feeds = null;
    main.articles = null;

    FeedFactory.fetchFeedData()
      .then((result) => {
        return main.feeds = FeedFactory.getFeeds();
      })
      .then((feeds) => {
        FeedFactory.fetchArticles(feeds);
      })
  })
  .factory('FeedFactory', function($http, BASE_API) {

    let allFeeds = [];
    let processedArticles = [];

    return {

      fetchFeedData: function() {
        return $http.get(`${BASE_API}/feeds.json`)
            .then((res) => {
              allFeeds = res.data;
            })
      },

      fetchArticles: function(feeds) {
        for (var key in feeds) {
          $http.get(feeds[key].url)
            .then((res) => {
              var parse = new DOMParser();
              var parseDoc = parse.parseFromString(res.data, "application/xml")
              console.log("parseDoc: ", parseDoc);
              console.log("parseDoc title: ", parseDoc.querySelector("title").innerHTML);
            })
        }
      },

      getFeeds: function() {
        return allFeeds;
      }

    }

  })
