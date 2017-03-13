(function() {
  'use strict';

  angular
  .module('application.editEvent',['ui.router'])
  .config(AddSpaceConfig);

  AddSpaceConfig.$inject = ['$stateProvider'];

  function AddSpaceConfig($stateProvider) {
    $stateProvider.state( 'editevent', {
      url: '/editevent/:eventID',
      views: {
        "main": {
          controller: 'EditEventController',
          controllerAs: 'editevent',
          templateUrl: 'events/editEvent/editEvent.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
