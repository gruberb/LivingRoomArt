(function() {
  'use strict';

  angular
  .module('application.applyOpenCall',['ui.router'])
  .config(ApplyOpenCallConfig);

  function ApplyOpenCallConfig($stateProvider) {
    $stateProvider.state( 'applyopencall', {
      url: '/applyopencall/:opencallID',
      views: {
        "main": {
          controller: 'ApplyOpenCallController',
          controllerAs: 'applyopencall',
          templateUrl: 'opencalls/applyOpenCall/applyOpenCall.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
