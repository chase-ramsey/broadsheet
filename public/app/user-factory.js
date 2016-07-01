angular.module('app')
  .factory('UserFactory', function($http, BASE_API) {

    let allProfiles = null;
    let currentProfile = null;

    return {

      fetchProfiles: () => {
        return $http.get(`${BASE_API}/profiles.json`);
      },

      setAllProfiles: (profiles) => {
        allProfiles = profiles;
      },

      setCurrentProfile: (profile) => {
        currentProfile = profile;
      },

      getCurrentProfile: () => {
        return currentProfile;
      },

      postNewFeeds: (userFeeds, profileKey) => {
        let promiseArr = [];
        for (var key in userFeeds) {
          promiseArr.push($http.post(`${BASE_API}/profiles/${profileKey}/feeds.json`, userFeeds[key]));
        }
        return promiseArr;
      },

      userDeleteFeeds: (keyArr, userKey) => {
        let promiseArr = [];
        keyArr.forEach((feedKey) => {
          promiseArr.push($http.delete(`${BASE_API}/profiles/${userKey}/feeds/${feedKey}.json`));
        })
        return promiseArr;
      },

      userSaveArticle: (article, profileKey) => {
        return $http.post(`${BASE_API}/profiles/${profileKey}/saved.json`, article);
      },

      userUnsaveArticle: (profileKey, articleKey) => {
        return $http.delete(`${BASE_API}/profiles/${profileKey}/saved/${articleKey}.json`);
      }

    }
  })
