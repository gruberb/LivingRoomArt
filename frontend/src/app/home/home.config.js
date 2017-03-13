(function() {
  'use strict';

  angular
    .module('application.home', ['ui.router'])
    .config(RegisterConfig);

  function RegisterConfig($stateProvider) {
    $stateProvider.state( 'home', {
      url: '/',
      views: {
        "main": {
          controller: 'HomeController',
          controllerAs: 'home',
          templateUrl: 'home/home.tpl.html'
        }
      }
    });
  }
})();
