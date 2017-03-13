(function() {
  'use strict';

  angular
    .module('application.addOpenCall',['ui.router'])
    .config(AddOpenCallConfig);

  function AddOpenCallConfig($stateProvider) {
    $stateProvider.state( 'addopencall', {
      url: '/addopencall',
      views: {
        "main": {
          controller: 'AddOpenCollController',
          controllerAs: 'addopencall',
          templateUrl: 'opencalls/addOpenCall/addOpenCall.tpl.html'
        }
      }
    });
  }
})();
