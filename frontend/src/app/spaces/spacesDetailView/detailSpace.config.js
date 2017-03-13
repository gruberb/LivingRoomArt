(function() {
  'use strict';

  angular
    .module('application.detailSpace', ['ui.router'])
    .config(DetailSpaceConfig);

  function DetailSpaceConfig($stateProvider) {
    $stateProvider.state( 'viewspace', {
      url: '/viewspace/:spaceID',
      views: {
        "main": {
          controller: 'DetailSpaceController',
          controllerAs: 'viewspace',
          templateUrl: 'spaces/spacesDetailView/detailSpace.tpl.html'
        }
      }
    });
  }
})();
