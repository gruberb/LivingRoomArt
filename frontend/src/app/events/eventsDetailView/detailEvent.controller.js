(function() {
  'use strict';

  angular
    .module('application.detailEvent')
    .controller('DetailEventController', DetailEventController);

  function DetailEventController($state, Api, AuthenticationService) {
    var viewevent = this;
    viewevent.isEventOwner = false;
    viewevent.hasRVSP = false;
    var eventID = $state.params.eventID;
    var user = {
      userID: AuthenticationService.getSession().userID,
      name: AuthenticationService.getSession().firstName + ' ' + AuthenticationService.getSession().lastName,
      email: AuthenticationService.getSession().email
    };

    var deleteEvent = function(eventID) {
      Api.deleteEvent(eventID).then(function(response) {
        $state.go('events');
      });
    };

    Api.getEventById(eventID).then(function(response) {
      viewevent._event = response.data.data;
      window._event = viewevent._event;
      viewevent.isEventOwner = AuthenticationService.getSession().userID == viewevent._event.userID;
      viewevent.address = viewevent._event.street + " " +
                          viewevent._event.housenumber + "," +
                          viewevent._event.zip + " " +
                          viewevent._event.city;

      viewevent.hasRVSP = !!_.findWhere(viewevent._event.attendees, user.userID);
    }, function(error) {
      event.preventDefault();
      viewevent.error_message = 'No event with this ID found!';
    });

    viewevent.rvspUser = function() {
      viewevent._event.attendee = JSON.stringify(user);

      Api.saveEvent(viewevent._event).then(function(response) {
        $state.go($state.$current, null, { reload: true });
      });
    };

    viewevent.unRvspUser = function() {
      viewevent._event.no_attendee = JSON.stringify(user);

      Api.saveEvent(viewevent._event).then(function(response) {
        $state.go($state.$current, null, { reload: true });
      });
    };

    viewevent.editEvent = function(eventID) {
      $state.go('editevent', { eventID: eventID });
    };

    viewevent.deleteEvent = function(eventID) {
      var confirmToDelete = confirm('Are you sure you want to delete ' + viewevent._event.name + '?');
      if(confirmToDelete) {
        deleteEvent(eventID);
      }
    };
  }
})();
