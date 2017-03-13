(function() {
  'use strict';

  angular
    .module('application.spaces',['ui.router'])
    .config(SpacesConfig);

  function SpacesConfig($stateProvider) {
    $stateProvider.state( 'spaces', {
      url: '/spaces',
      views: {
        "main": {
          controller: 'SpacesController',
          controllerAs: 'allspaces',
          templateUrl: 'spaces/spacesOverview/spaces.tpl.html'
        }
      }
    });
  }
})();
