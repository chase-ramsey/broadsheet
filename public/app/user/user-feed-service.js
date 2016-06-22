angular.module('app')
  .service('UserFeedService', function() {
    this.userFeed = function (key, name, link, topic) {
      this.key = key;
      this.name = name;
      this.url = link;
      this.topic = topic;
    }
  })
