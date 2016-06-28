angular.module('app')
  .factory('CommentFactory', function($http, BASE_API) {

    return {

      postComments: (comments) => {
        return $http.post(`${BASE_API}/comments.json`, comments);
      },

      patchComments: (comments, id) => {
        return $http.post(`${BASE_API}/comments/${id}.json`, comments);
      }

    }

  })
