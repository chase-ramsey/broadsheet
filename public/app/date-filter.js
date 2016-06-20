angular.module('app')
  .filter('dateFormat', () => {
    return (date) => {
      return moment(date).calendar();
    }
  })
