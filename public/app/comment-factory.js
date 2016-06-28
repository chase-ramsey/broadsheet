angular.module('app')
  .factory('CommentFactory', function($http, BASE_API) {

    return {

      fetchAllComments: () => {
        return $http.get(`${BASE_API}/comments.json`);
      },

      postComments: (comments) => {
        return $http.post(`${BASE_API}/comments.json`, comments);
      },

      patchComments: (comments, id) => {
        console.log("comments: ", comments);
        console.log("id: ", id);
        return $http.patch(`${BASE_API}/comments/${id}/.json`, comments);
      }

    }

  })
