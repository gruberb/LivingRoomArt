(function() {
  'use strict';

  angular
    .module('application.events',['ui.router'])
    .config(EventsConfig);

  function EventsConfig($stateProvider) {
    $stateProvider.state( 'events', {
      url: '/events',
      views: {
        "main": {
          controller: 'EventsController',
          controllerAs: 'allevents',
          templateUrl: 'events/eventsOverview/events.tpl.html'
        }
      }
    });
  }
})();
