(function() {
  'use strict';

  angular
  .module('application.addEvent',['ui.router'])
  .config(AddEventConfig);

  function AddEventConfig($stateProvider) {
    $stateProvider.state( 'addevent', {
      url: '/addevent',
      views: {
        "main": {
          controller: 'AddEventController',
          controllerAs: 'addevent',
          templateUrl: 'events/addEvent/addEvent.tpl.html'
        }
      }
    });
  }
})();
