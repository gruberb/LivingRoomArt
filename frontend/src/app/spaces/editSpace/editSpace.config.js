(function() {
  'use strict';

  angular
    .module('application.editSpace',['ui.router'])
    .config(AddSpaceConfig);

  function AddSpaceConfig($stateProvider) {
    $stateProvider.state( 'editspace', {
      url: '/editspace/:spaceID',
      views: {
        "main": {
          controller: 'EditSpaceController',
          controllerAs: 'editspace',
          templateUrl: 'spaces/editSpace/editSpace.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
