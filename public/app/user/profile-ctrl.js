angular.module('app')
  .controller('ProfileCtrl', function($scope, $location, $http, $route, AuthFactory, UserFactory, FeedFactory, BASE_API) {
    const profile = this;

    profile.user = AuthFactory.getLoggedUser();
    profile.allFeeds = FeedFactory.getFeeds();
    profile.current = {};
    profile.currentKey = null,
    profile.articles = null;

    profile.loading = true;

    profile.filtering = false;
    profile.userSearch = '';
    profile.userFilterTopic = '';
    profile.userFilterFeed = '';

    profile.spotlight = false;
    profile.spotlightItem = {};

    UserFactory.fetchProfiles()
      .then((res) => {
        console.log("res: ", res);
        UserFactory.setAllProfiles(res.data);
        for (var key in res.data) {
          if (profile.user === null) {
            $location.path('/');
          } else if (res.data[key].uid === profile.user.uid) {
              profile.current[key] = res.data[key];
              profile.currentKey = Object.keys(profile.current)[0];
              console.log("profile.current: ", profile.current);
              profile.checkUserProfiles(profile.current, profile.currentKey);
          }
        }
      })

    profile.checkUserProfiles = (current, key) => {
      if (!current[key].feeds) {
        profile.loading = false;
        profile.noFeeds = true;
      } else {
        profile.loadArticles();
      }
    }

    profile.loadArticles = () => {
      if (profile.noFeeds) {
        console.log("no feeds =============");
        return;
      }
      var promises = FeedFactory.fetchArticles(profile.current[profile.currentKey].feeds);
      Promise.all(promises)
        .then(() => {
          profile.articles = FeedFactory.getArticles();
          profile.loading = false;
          profile.noFeeds = false;
          $scope.$apply();
        })
    }

    profile.topicColors = {
      'news': 'bg-blue',
      'politics': 'bg-red',
      'videogames': 'bg-green',
      'music': 'bg-purple',
      'movies': 'bg-orange',
      'culture': 'bg-yellow',
      'tech': 'bg-navy'
    }

    profile.setTopicColor = (topic) => {
      for (var key in profile.topicColors) {
        if (key === topic) {
          return profile.topicColors[key];
        }
      }
    }

    profile.setTopicFilter = (topic) => {
      if (profile.noFeeds) {
        return;
      }
      profile.userFilterFeed = '';
      profile.userFilterTopic = topic;
      profile.filtering = false;
    }

    profile.setFeedFilter = (article) => {
      profile.userFilterFeed = article.pubTitle;
    }

    profile.clearFilters = () => {
      profile.userSearch = '';
      profile.userFilterTopic = '';
      profile.userFilterFeed = '';
    }

    profile.setSpotlight = (bool, item) => {
      profile.spotlight = bool;
      profile.spotlightItem = item;
    }

    profile.removeFeed = (feed) => {
      delete profile.newFeeds[feed];
    }

    profile.subscribe = (feeds) => {
      console.log("newFeeds: ", profile.newFeeds);
      let promiseArr = [];
      for (var key in feeds) {
        console.log("feeds[key]", feeds[key]);
        promiseArr.push($http.post(`${BASE_API}/profiles/${profile.currentKey}/feeds.json`, feeds[key]));
      }
      Promise.all(promiseArr)
        .then(() => {
          $route.reload();
          // profile.loadArticles();
        })
        .catch(console.log);
      // $http.post(`${BASE_API}/profiles/${profile.currentKey}/feeds.json`)
      //   .then(() => {
      //     profile.loadArticles();
      //   })
      //   .catch(console.log);
    }

  })
