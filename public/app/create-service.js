angular.module('app')
  .service('CreateService', function() {
    this.newArticle = function (title, author, link, description, date, publ, topic) {
      this.title = title;
      this.author = author;
      this.link = link;
      this.description = description;
      this.date = date;
      this.pubTitle = publ;
      this.topic = topic;
    }
  })
