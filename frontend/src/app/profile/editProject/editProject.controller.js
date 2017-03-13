(function() {
  'use strict';

  angular
    .module('application.editProject')
    .controller('EditProjectController', EditProjectController);

  function EditProjectController($state, Api, AuthenticationService, eventCategories) {
    var editproject = this;
    var projectID = $state.params.projectID;
    var userID = AuthenticationService.getSession().userID;
    editproject.categories = eventCategories;

    Api.getProjectById(projectID).then(function(response) {
      editproject.project = response.data.data;

      if(editproject.project.userID != AuthenticationService.getSession().userID) {
        event.preventDefault();
        editproject.error_message = 'You have to be owner of the profile to be able to edit projects of it!';
      }

      editproject.project.from = new Date(response.data.data.from);
      editproject.project.to = new Date(response.data.data.to);
    });

    window.editproject = editproject;

    editproject.saveProject = function(project) {
      project.userID = userID;
      if(typeof(project.picture) === 'object') {
        Api.uploadImage(project.picture).then(function(response) {
          project.picture = response.data.data;
          Api.saveProject(project).then(function(response) {
            $state.go('viewprofile.projects', { userID: userID });
          });
        });
      } else {
        Api.saveProject(project).then(function(response) {
          $state.go('viewprofile.projects', { userID: userID });
        });
      }
    };

    editproject.goBack = function() {
      $state.go('viewprofile.projects', {userID : userID});
    };
  }
})();
