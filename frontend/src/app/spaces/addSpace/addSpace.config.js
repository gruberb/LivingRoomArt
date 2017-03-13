(function() {
  'use strict';

  angular
  .module('application.addSpace',['ui.router'])
  .config(AddSpaceConfig);

  AddSpaceConfig.$inject = ['$stateProvider'];

  function AddSpaceConfig($stateProvider) {
    $stateProvider.state( 'addspace', {
      url: '/addspace',
      views: {
        "main": {
          controller: 'AddSpaceController',
          controllerAs: 'addspace',
          templateUrl: 'spaces/addSpace/addSpace.tpl.html'
        }
      }
    });
  }
})();
