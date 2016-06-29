angular.module('app')
  .factory('CommentFactory', function($http, BASE_API) {

    return {

      fetchAllComments: () => {
        return $http.get(`${BASE_API}/comments.json`);
      },

      postComment: (comments) => {
        return $http.post(`${BASE_API}/comments.json`, comments);
      }

    }

  })
