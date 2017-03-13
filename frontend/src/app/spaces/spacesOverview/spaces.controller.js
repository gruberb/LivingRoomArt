(function() {
  'use strict';

  angular
  .module('application.spaces')
  .controller('SpacesController', SpacesController);

  function SpacesController($state, Api) {
    var allspaces = this;

    Api.getAllSpaces().then(function(response) {
      allspaces.spaces = response.data.data;
    });

    allspaces.spaceDetails = function(space) {
      $state.go('viewspace', { spaceID: space._id});
    };
  }
})();
