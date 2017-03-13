(function() {
  'use strict';

  angular
    .module('application.editProfile',['ui.router'])
    .config(EditProfile);

  function EditProfile($stateProvider) {
    $stateProvider.state( 'editprofile', {
      url: '/editprofile/:userID',
      views: {
        "main": {
          controller: 'EditProfileController',
          controllerAs: 'editprofile',
          templateUrl: 'profile/editProfile/editProfile.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
