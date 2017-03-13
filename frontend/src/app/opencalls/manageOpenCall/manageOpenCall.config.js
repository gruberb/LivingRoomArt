(function() {
  'use strict';

  angular
    .module('application.manageOpenCall', ['ui.router'])
    .config(ManageOpenCallConfig);

  function ManageOpenCallConfig($stateProvider) {
    $stateProvider.state( 'manageopencall', {
      url: '/manageopencall/:opencallID',
      views: {
        "main": {
          controller: 'ManageOpenCallController',
          controllerAs: 'manageopencall',
          templateUrl: 'opencalls/manageOpenCall/manageOpenCall.tpl.html'
        }
      }
    });
  }
})();
