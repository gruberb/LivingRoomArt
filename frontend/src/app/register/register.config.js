(function() {
  'use strict';

  angular
    .module('application.register', ['ui.router'])
    .config(RegisterConfig);

  function RegisterConfig($stateProvider) {
    $stateProvider.state( 'register', {
      url: '/register',
      views: {
        "main": {
          controller: 'RegisterController',
          controllerAs: 'register',
          templateUrl: 'register/register.tpl.html'
        }
      }
    });
  }
})();
