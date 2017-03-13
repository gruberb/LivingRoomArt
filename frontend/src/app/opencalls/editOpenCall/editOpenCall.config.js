(function() {
  'use strict';

  angular
    .module('application.editOpenCall',['ui.router'])
    .config(EditOpenCallConfig);

  function EditOpenCallConfig($stateProvider) {
    $stateProvider.state( 'editopencall', {
      url: '/editopencall/:opencallID',
      views: {
        "main": {
          controller: 'EditOpenCallController',
          controllerAs: 'editopencall',
          templateUrl: 'opencalls/editOpenCall/editOpenCall.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
