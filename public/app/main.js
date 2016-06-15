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
        for (var key in feeds) {
          $http.get(feeds[key].url)
            .then((res) => {
              var parse = new DOMParser();
              var xml = parse.parseFromString(res.data, 'application/xml');
              var pubTitle = xml.querySelector('title').innerHTML;
              var parseResult = ParseFactory.docParse(xml);
              parseResult.forEach((result) => {
                processedArticles.push(result);
              })
              console.log("processedArticles after parse: ", processedArticles);
              // processedArticles.push(ParseFactory.docParse(xml));
            })
        }
      },

      getFeeds: function() {
        return allFeeds;
      },

      getArticles: function() {
        return processedArticles;
      }

    }

  })
  .factory('ParseFactory', function(CreateService) {

    return {

      docParse: function(xml) {
        // console.debug("articles ====================");
        // let itemBool = (xml.getElementsByTagName("item").length !== 0);
        // console.log("item: ", itemBool);
        // let entryBool = (xml.getElementsByTagName("entry").length !== 0);
        // console.log("entry: ", entryBool);
        // console.debug("titles ====================");
        // let itemTitleBool = (xml.querySelector("item title") !== null);
        // console.log("item title: ", itemTitleBool);
        // let entryTitleBool = (xml.querySelector("entry title") !== null);
        // console.log("entry title: ", entryTitleBool);
        // console.debug("authors ====================");
        // let authorBool = (xml.getElementsByTagName("author").length !== 0);
        // console.log("author: ", authorBool);
        // let creatorBool = (xml.getElementsByTagName("creator").length !== 0);
        // console.log("creator: ", creatorBool);
        // console.debug("links ====================");
        // let itemLinkBool = (xml.querySelector("item link") !== null);
        // console.log("item link: ", itemLinkBool);
        // let entryLinkBool = (xml.querySelector("entry link") !== null);
        // console.log("entry link: ", entryLinkBool);
        // console.debug("dates ====================");
        // let dateBool = (xml.getElementsByTagName("pubDate").length !== 0)
        // console.log("dateBool: ", dateBool);
        // let pubBool = (xml.getElementsByTagName("published").length !== 0)
        // console.log("pubBool: ", pubBool);
        let returnObjects = [];
        let articles = [];
      // Get publication title
        const pubTitle = xml.querySelector('title').innerHTML;
      // Get articles by 'item' or 'entry'
        if (xml.getElementsByTagName('item').length !== 0) {
          articles = Array.from(xml.getElementsByTagName('item'));
        } else if (xml.getElementsByTagName('entry').length !== 0) {
          articles = Array.from(xml.getElementsByTagName('entry'));
        }
      // Loop over each item/entry to get values for every article
        articles.forEach(function(article) {
        // Get article title
          const title = article.querySelector('title').innerHTML;
        // Get article author
          const author = (() => {
            if (article.getElementsByTagName('author').length !== 0) {
              return article.getElementsByTagName('author')[0].textContent;
            } else if (article.getElementsByTagName('creator').length !== 0) {
              return article.getElementsByTagName('creator')[0].textContent;
            } else {
              return '';
            }
          })();
        // Get article link
          const link = (() => {
            if (article.querySelector('link') === null) {
              console.log('link null');
              return '';
            } else if (article.querySelector('link').innerHTML === '') {
              return article.querySelector('link').getAttribute('href');
            } else {
              return article.querySelector('link').innerHTML;
            }
          })();
        // Get article date published
          const date = (() => {
            if (article.querySelector('pubDate') !== null) {
              return article.querySelector('pubDate').innerHTML;
            } else if (article.querySelector('published') !== null) {
              return article.querySelector('published').innerHTML;
            } else {
              return '';
            }
          })();
        // Create new object with values and push them to the processedArticles array
          var articleObject = new CreateService.newArticle(title, author, link, date, pubTitle);
          console.log('articleObject: ', articleObject);
          returnObjects.push(articleObject);
        })
        return returnObjects;
      }

    }
  })
  .service('CreateService', function() {
    this.newArticle = function (title, author, link, date, publ) {
      this.title = title;
      this.author = author;
      this.link = link;
      this.date = date;
      this.pubTitle = publ;
    }
  })
