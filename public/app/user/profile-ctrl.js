angular.module('app')
  .controller('ProfileCtrl', function($location, AuthFactory, UserFactory, FeedFactory) {
    const profile = this;

    profile.user = AuthFactory.getLoggedUser();
    profile.current = null;
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
        console.log("profile.user: ", profile.user);
        UserFactory.setAllProfiles(res.data);
        for (var key in res.data) {
          if (profile.user === null) {
            $location.path('/');
          } else if (res.data[key].uid === profile.user.uid) {
              profile.current = res.data[key];
              console.log("profile.current: ", profile.current);
              profile.checkUserProfiles(profile.current);
          }
        }
      })

    profile.checkUserProfiles = (current) => {
      if (!profile.feeds) {
        profile.loading = false;
        profile.noFeeds = true;
      } else {
        FeedFactory.fetchArticles(profile.feeds)
          .then((promiseArr) => {
            Promise.all(promiseArr)
              .then(() => {
                profile.articles = FeedFactory.getArticles();
                profile.loading = false;
                profile.noFeeds = false;
                $scope.$apply();
              })
          })
      }
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
      profile.userFilterFeed = '';
      profile.userFilterTopic = topic;
      profile.filtering = false;
    }

    profile.setFeedFilter = (article) => {
      profile.userFilterFeed = article.pubTitle;
    }

    profile.clearFilters = () => {
      profile.userFilterTopic = '';
      profile.userFilterFeed = '';
    }

    profile.setSpotlight = (bool, item) => {
      profile.spotlight = bool;
      profile.spotlightItem = item;
    }

  })
