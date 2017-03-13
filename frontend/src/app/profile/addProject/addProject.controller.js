(function() {
  'use strict';

  angular
  .module('application.addProject')
  .controller('AddProjectController', AddProjectController);

  function AddProjectController($state, Api, AuthenticationService, eventCategories) {
    var addproject = this;
    var userID = AuthenticationService.getSession().userID;
    addproject.project = {};
    addproject.pictures = [];
    addproject.categories = eventCategories;

    addproject.addProject = function(project) {
      project.userID = AuthenticationService.getSession().userID;

      if(typeof(project.picture) === 'object') {
        Api.uploadImage(project.picture).then(function(response) {
          project.pictures = response.data.data;
          Api.addProject(project).then(function(response) {
            $state.go('viewprofile.projects', {userID: userID});
          });
        });
      } else {
        Api.addProject(project).then(function(response) {
          $state.go('viewprofile.projects', {userID: userID});
        });
      }
    };

    addproject.goBack = function() {
      $state.go('viewprofile.projects', {userID: userID});
    };
  }
})();
