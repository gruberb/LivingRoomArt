(function() {
  'use strict';

  angular
  .module('application.events')
  .controller('EventsController', EventsController);

  function EventsController($state, Api) {
    var allevents = this;

    Api.getAllEvents().then(function(response) {
      allevents.events = response.data.data;
    });

    allevents.eventDetails = function(_event) {
      $state.go('viewevent', { eventID: _event._id});
    };
  }
})();
