(function() {
  'use strict';

  angular
    .module('application.detailEvent', ['ui.router'])
    .config(DetailEventConfig);

  function DetailEventConfig($stateProvider) {
    $stateProvider.state( 'viewevent', {
      url: '/viewevent/:eventID',
      views: {
        "main": {
          controller: 'DetailEventController',
          controllerAs: 'viewevent',
          templateUrl: 'events/eventsDetailView/detailEvent.tpl.html'
        }
      }
    });
  }
})();
