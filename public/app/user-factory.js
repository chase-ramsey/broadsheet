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
      }
    }
  })
