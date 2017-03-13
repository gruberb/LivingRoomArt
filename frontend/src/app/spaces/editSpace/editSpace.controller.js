(function() {
  'use strict';

  angular
  .module('application.editSpace')
  .controller('EditSpaceController', EditSpaceController);

  function EditSpaceController($state, Api, AuthenticationService, countries, spaceCategories) {
    var editspace = this;
    var spaceID = $state.params.spaceID;

    editspace.space = {};
    editspace.categories = spaceCategories;
    editspace.countries = countries;

    var hasPermission = function(spaceUserID, userID) {
      return spaceUserID === userID;
    };

    Api.getSpaceById(spaceID).then(function(response) {
      editspace.space = response.data.data;
      editspace.space.from = new Date(response.data.data.from);
      editspace.space.to = new Date(response.data.data.to);

      if(!hasPermission(editspace.space.userID, AuthenticationService.getSession().userID)) {
        event.preventDefault();
        editspace.error_message = 'You have to be owner of the space to be able to edit it!';
      }
    }, function(error) {
      event.preventDefault();
      editspace.error_message = 'No space with this ID found!';
    });

    var deleteSpace = function(spaceID) {
      Api.deleteSpace(spaceID).then(function(response) {
        $state.go('spaces');
      });
    };

    editspace.saveSpace = function(space) {
      space.userID = AuthenticationService.getSession().userID;

      if(typeof(space.picture) === 'object') {
        Api.uploadImage(space.picture).then(function(response) {
          space.picture = response.data.data;
          Api.saveSpace(space).then(function(response) {
            $state.go('viewspace', { spaceID: space._id });
          });
        });
      } else {
        Api.saveSpace(space).then(function(response) {
          $state.go('viewspace', { spaceID: space._id });
        });
      }
    };

    editspace.removeImage = function() {
      delete editspace.space.picture;
    };

    editspace.deleteSpace = function(spaceID) {
      var confirmToDelete = confirm('Are you sure you want to delete ' + editspace.space.name + '?');
      if(confirmToDelete) {
        deleteSpace(spaceID);
      }
    };

    editspace.goBack = function(spaceID) {
      $state.go('viewspace', { spaceID: spaceID });
    };
  }
})();
