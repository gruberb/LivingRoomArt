(function() {
  'use strict';

  angular
    .module('application.editProfile')
    .controller('EditProfileController', EditProfileController);

  function EditProfileController($state, Api, AuthenticationService, countries) {
    var editprofile = this;
    var userID = $state.params.userID;

    editprofile.countries = countries;


    var hasPermission = function(profileID, userID) {
      return profileID === userID;
    };

    Api.getUserById(userID).then(function(response) {
      editprofile.user = response.data.data;

      if(!hasPermission(editprofile.user._id, AuthenticationService.getSession().userID)) {
        event.preventDefault();
        editprofile.error_message = 'You have to be owner of the profile to be able to edit it!';
      }
    });

    editprofile.removeIage = function() {
      delete editprofile.user.profilePhoto;
    };

    editprofile.saveUser = function(user) {
      if(typeof(user.profilePhoto) === 'object') {
        Api.uploadImage(user.profilePhoto).then(function(response) {
          user.profilePhoto = response.data.data;
          Api.saveUser(user).then(function(response) {
            $state.go('viewprofile.about', { userID: user._id });
          });
        });
      } else {
        Api.saveUser(user).then(function(response) {
          $state.go('viewprofile.about', { userID: user._id });
        });
      }
    };

    editprofile.goBack = function(userID) {
      $state.go('viewprofile', { userID: userID });
    };
  }
})();
