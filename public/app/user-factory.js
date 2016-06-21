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

      postNewFeeds: (userFeeds) => {
        let promiseArr = [];
        for (var key in userFeeds) {
          promiseArr.push($http.post(`${BASE_API}/profiles/${profile.currentKey}/feeds.json`, userFeeds[key]));
        }
      }
    }
  })
