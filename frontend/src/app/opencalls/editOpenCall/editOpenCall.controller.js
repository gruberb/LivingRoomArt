(function() {
  'use strict';

  angular
  .module('application.editOpenCall')
  .controller('EditOpenCallController', EditOpenCallController);

  function EditOpenCallController($state, Api, AuthenticationService, countries, eventCategories) {
    var editopencall = this;
    var opencallID = $state.params.opencallID;

    editopencall.opencall = {};
    editopencall.countries = countries;
    editopencall.categories = eventCategories;

    var hasPermission = function(opencallUserID, userID) {
      return (opencallUserID === AuthenticationService.getSession().userID);
    };

    Api.getOpenCallById(opencallID).then(function(response) {
      editopencall.opencall = response.data.data;
      editopencall.opencall.from = new Date(response.data.data.from);
      editopencall.opencall.to = new Date(response.data.data.to);

      if(!hasPermission(editopencall.opencall.userID, AuthenticationService.getSession().userID)) {
        event.preventDefault();
        editopencall.error_message = 'You have to be owner of the OpenCall to be able to edit it!';
      }
    }, function(error) {
      event.preventDefault();
      editopencall.error_message = 'No OpenCall with this ID found!';
    });

    var deleteOpenCall = function(opencallID) {
      Api.deleteOpenCall(opencallID).then(function(response) {
        $state.go('opencalls');
      });
    };

    editopencall.removeImage = function() {
      delete editopencall.opencall.picture;
    };

    editopencall.saveOpenCall = function(opencall) {
      opencall.userID = AuthenticationService.getSession().userID;

      if(typeof(opencall.picture) === 'object') {
        Api.uploadImage(opencall.picture).then(function(response) {
          opencall.picture = response.data.data;
          Api.saveOpenCall(opencall).then(function(response) {
            $state.go('viewopencall', { opencallID: opencall._id });
          });
        });
      } else {
        Api.saveOpenCall(opencall).then(function(response) {
          $state.go('viewopencall', { opencallID: opencall._id });
        });
      }
    };

    editopencall.deleteOpenCall = function(opencallID) {
      var confirmToDelete = confirm('Are you sure you want to delete ' + editopencall.opencall.name + '?');
      if(confirmToDelete) {
        deleteOpenCall(opencallID);
      }
    };

    editopencall.goBack = function(opencallID) {
      $state.go('viewopencall', { opencallID: opencallID });
    };
  }
})();
