angular.module('app')
  .controller('MainCtrl', function($scope, FeedFactory, AuthFactory) {
    const main = this;

    main.feeds = null;
    main.articles = null;
    main.loading = false;

    main.filtering = false;
    main.userSearch = '';
    main.userFilterTopic = '';

    main.spotlight = false;
    main.spotlightItem = {};

    main.login = false;
    main.user = null;

    main.loadArticles = () => {
      main.loading = false;
      FeedFactory.fetchFeedData()
        .then((result) => {
          return main.feeds = FeedFactory.getFeeds();
        })
        .then((feeds) => {
          return FeedFactory.fetchArticles(feeds);
        })
        .then((promiseArr) => {
          Promise.all(promiseArr)
            .then(() => {
              main.articles = FeedFactory.getArticles();
              main.loading = true;
              $scope.$apply();
              // console.log("main.articles: ", main.articles);
            })
        })
    }

    main.loadArticles();

    firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        AuthFactory.setLoggedUser(firebase.auth().currentUser);
        main.user = AuthFactory.getLoggedUser();
        console.log("main.user: ", main.user);
        main.login = true;
      }
    })

    main.topicColors = {
      'news': 'bg-blue',
      'politics': 'bg-red',
      'videogames': 'bg-green',
      'music': 'bg-purple',
      'movies': 'bg-orange',
      'culture': 'bg-yellow',
      'tech': 'bg-navy'
    }

    main.setTopicColor = (topic) => {
      for (var key in main.topicColors) {
        if (key === topic) {
          return main.topicColors[key];
        }
      }
    }

    main.setTopicFilter = (topic) => {
      main.userFilterTopic = topic;
      main.filtering = false;
    }

    main.setFeedFilter = (article) => {
      main.userFilterFeed = article.pubTitle;
    }

    main.clearFilters = () => {
      main.userFilterTopic = '';
      main.userFilterFeed = '';
    }

    main.setSpotlight = (bool, item) => {
      main.spotlight = bool;
      main.spotlightItem = item;
    }

  })
