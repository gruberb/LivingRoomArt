(function() {
  'use strict';

  angular
    .module('application.editProject',['ui.router'])
    .config(EditProject);

  function EditProject($stateProvider) {
    $stateProvider.state( 'editproject', {
      url: '/editproject/:projectID',
      views: {
        "main": {
          controller: 'EditProjectController',
          controllerAs: 'editproject',
          templateUrl: 'profile/editProject/editProject.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
