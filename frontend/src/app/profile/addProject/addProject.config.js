(function() {
  'use strict';

  angular
    .module('application.addProject',['ui.router'])
    .config(AddProject);

  function AddProject($stateProvider) {
    $stateProvider.state( 'addproject', {
      url: '/addproject',
      views: {
        "main": {
          controller: 'AddProjectController',
          controllerAs: 'addproject',
          templateUrl: 'profile/addProject/addProject.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
