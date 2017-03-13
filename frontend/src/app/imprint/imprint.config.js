(function() {
  'use strict';

  angular
    .module('application.imprint', ['ui.router'])
    .config(LoginConfig);

  function LoginConfig($stateProvider) {
    $stateProvider.state( 'imprint', {
      url: '/imprint',
      views: {
        "main": {
          controller: 'ImprintController',
          controllerAs: 'imprint',
          templateUrl: 'imprint/imprint.tpl.html'
        }
      }
    });
  }
})();
