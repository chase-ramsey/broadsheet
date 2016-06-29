angular.module('app')
  .service('DisplayCommentService', function() {
    this.create = function (key, obj) {
      this[key] = obj;
    }
  })
