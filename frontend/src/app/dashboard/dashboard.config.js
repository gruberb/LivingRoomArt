(function() {
  'use strict';

  angular
    .module('application.dashboard', ['ui.router'])
    .config(DashboardConfig);

  function DashboardConfig($stateProvider) {
    $stateProvider.state( 'dashboard', {
      url: '/dashboard',
      views: {
        "main": {
          controller: 'DashboardController',
          controllerAs: 'dashboard',
          templateUrl: 'dashboard/dashboard.tpl.html'
        }
      }
    });
  }
})();
