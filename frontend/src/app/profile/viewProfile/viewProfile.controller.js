(function() {
  'use strict';

  angular
    .module('application.viewProfile')
    .controller('ViewProfileController', ViewProfileController);

  function ViewProfileController($state, Api, AuthenticationService) {
    var viewprofile = this;
    var userID = $state.params.userID;
    viewprofile.isOwner = (AuthenticationService.getSession().userID === userID);
    viewprofile.isPreview = false;

    Api.getUserById(userID).then(function(response) {
      viewprofile.user = response.data.data;
      viewprofile.address = viewprofile.user.street + " " +
                        viewprofile.user.housenumber + "," +
                        viewprofile.user.zip + " " +
                        viewprofile.user.city;
      return viewprofile;
    }, function(error) {
      event.preventDefault();
      viewprofile.error_message = 'No space with this ID found!';    
    }).then(function(viewprofile) {
        Api.getAllProjectsForUser(userID).then(function(response) {
          viewprofile.user.projects = response.data.data;
        });
    });

    viewprofile.setPreview = function() {
      viewprofile.isPreview = !viewprofile.isPreview;
    };

    viewprofile.editProject = function(projectID) {
      $state.go('editproject', { projectID: projectID });
    };

    viewprofile.deleteProject = function(projectID) {
      Api.deleteProject(projectID).then(function(response) {
        $state.go($state.$current, null, { reload: true });
      });
    };

    viewprofile.editProfile = function(userID) {
      $state.go('editprofile', { userID: userID });
    };

  }
})();
