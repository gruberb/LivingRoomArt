(function() {
  'use strict';

  angular
    .module('application.opencalls',['ui.router'])
    .config(OpenCallConfig);

  function OpenCallConfig($stateProvider) {
    $stateProvider.state( 'opencalls', {
      url: '/opencalls',
      views: {
        "main": {
          controller: 'OpenCallsController',
          controllerAs: 'allopencalls',
          templateUrl: 'opencalls/openCallsOverview/opencalls.tpl.html'
        }
      }
    });
  }
})();
