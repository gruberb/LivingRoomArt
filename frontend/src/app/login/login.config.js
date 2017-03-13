(function() {
  'use strict';

  angular
    .module('application.login', ['ui.router'])
    .config(LoginConfig);

  function LoginConfig($stateProvider) {
    $stateProvider.state( 'login', {
      url: '/login',
      views: {
        "main": {
          controller: 'LoginController',
          controllerAs: 'login',
          templateUrl: 'login/login.tpl.html'
        }
      }
    });
  }
})();
