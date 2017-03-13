(function() {
  'use strict';

  angular
    .module('application.detailOpenCall', ['ui.router'])
    .config(DetailsOpenCallConfig);

  function DetailsOpenCallConfig($stateProvider) {
    $stateProvider.state( 'viewopencall', {
      url: '/viewopencall/:opencallID',
      views: {
        "main": {
          controller: 'DetailOpenCallCotrnoller',
          controllerAs: 'viewopencall',
          templateUrl: 'opencalls/openCallsDetailView/detailOpenCall.tpl.html'
        }
      }
    });
  }
})();
