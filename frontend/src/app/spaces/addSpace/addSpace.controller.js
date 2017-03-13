(function() {
  'use strict';

  angular
  .module('application.addSpace')
  .controller('AddSpaceController', AddSpaceController);

  function AddSpaceController($state, Api, AuthenticationService, countries, spaceCategories) {
    var addspace = this;
    addspace.space = {};

    addspace.categories = spaceCategories;
    addspace.countries = countries;

    addspace.removeImage = function() {
      delete addspace.space.picture;
    };

    addspace.addSpace = function(space) {
      space.userID = AuthenticationService.getSession().userID;

      if(typeof(space.picture) === 'object') {
        Api.uploadImage(space.picture).then(function(response) {
          space.picture = response.data.data;
          Api.addSpace(space).then(function(response) {
            $state.go('spaces');
          });
        });
      } else {
        Api.addSpace(space).then(function(response) {
          $state.go('spaces');
        });
      }
    };
  }
})();
