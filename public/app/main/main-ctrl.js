angular.module('app')
  .controller('MainCtrl', function($scope, FeedFactory, AuthFactory, CommentFactory, CommentService, DisplayCommentService) {
    const main = this;

    main.feeds = null;
    main.articles = null;
    main.loading = true;

    main.filtering = false;
    main.userSearch = '';
    main.userFilterTopic = '';

    main.spotlight = false;
    main.spotlightItem = {};

    main.login = false;
    main.user = null;

    main.loadArticles = () => {
      main.loading = true;
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
              main.loading = false;
              $scope.$apply();
              CommentFactory.fetchAllComments()
                .then((res) => {
                  main.commentCheck(res.data);
                })
            })
        })
    }

    main.loadArticles();

    firebase.auth().onAuthStateChanged((res) => {
      if (res) {
        AuthFactory.setLoggedUser(firebase.auth().currentUser);
        main.user = AuthFactory.getLoggedUser();
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
      main.userFilterFeed = '';
      main.userFilterTopic = topic;
      main.filtering = false;
    }

    main.setFeedFilter = (article) => {
      main.userFilterFeed = article.pubTitle;
    }

    main.clearFilters = () => {
      main.userSearch = '';
      main.userFilterTopic = '';
      main.userFilterFeed = '';
    }

    main.setSpotlight = (bool, item) => {
      main.spotlight = bool;
      main.spotlightItem = item;
    }

    main.commentCheck = (data) => {
      for (let key in data) {
        main.articles.forEach((article) => {
          if (article.link === data[key].link) {
            if (article.comments === undefined) {
              article.comments = [];
            }
            let doNotAdd = false;
            article.comments.forEach((comment) => {
              if (Object.keys(comment)[0] === key) {
                doNotAdd = true;
              }
            })
            if (!doNotAdd) {
              data[key].key = key;
              article.comments.push(data[key]);
              if (main.spotlight === true) {
                console.log("article after add: ", article);
                main.setSpotlight(true, article);
                $scope.$apply();
              }
            }
            doNotAdd = false;
          }
        })
      }
    }

    main.submitComment = (article) => {
      if (main.user === null) {
        window.alert('You must be logged in to create a comment.');
        return;
      }
      newCommentUrl = article.link;
      let comment = new CommentService.createComment(main.user.displayName, main.newCommentText, newCommentUrl)
      CommentFactory.postComments(comment);
      main.newCommentText = '';
    }

    firebase.database().ref('/comments').on('child_added', (res) => {
      console.log("res: ", res);
      if (main.articles === null) {
        return;
      } else {
        let key = res.getKey();
        let displayComment = new DisplayCommentService.create(key, res.val())
        main.commentCheck(displayComment);
      }
    })

  })
