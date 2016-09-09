angular.module('app')
  .factory('FeedFactory', function($http, ParseFactory, BASE_API) {

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
        let promiseArray = [];
        processedArticles = [];
        for (var key in feeds) {
          let currentTopic = feeds[key].topic
          promiseArray.push(
            $http.get(`/getServer/${feeds[key].url}`)
              .then((res) => {
                var parse = new DOMParser();
                var xml = parse.parseFromString(res.data, 'application/xml');
                // console.log(`doc: `, xml);
                var pubTitle = xml.querySelector('title').innerHTML;
                var parseResult = ParseFactory.docParse(xml, currentTopic);
                for (var i = 0; i < 10; i++) {
                  if (parseResult[i] === undefined) {
                    return;
                  } else {
                    processedArticles.push(parseResult[i]);
                  }
                }
              })
            )
        }
        return promiseArray;
      },

      getFeeds: function() {
        return allFeeds;
      },

      getArticles: function() {
        return processedArticles;
      }

    }

  })
