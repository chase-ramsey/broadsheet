angular.module('app')
  .service('CommentService', function() {
    this.createComment = function (username, text, link) {
      this.user = username;
      this.text = text;
      this.link = link
      this.time = new Date().toISOString();
    }
  })
