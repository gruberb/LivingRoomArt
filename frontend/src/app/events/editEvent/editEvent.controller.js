(function() {
  'use strict';

  angular
  .module('application.editEvent')
  .controller('EditEventController', EditEventController);

  function EditEventController($state, Api, AuthenticationService, countries, eventCategories) {
    var editevent = this;
    var eventID = $state.params.eventID;

    editevent._event = {};
    editevent.countries = countries;
    editevent.categories = eventCategories;

    var hasPermission = function(eventUserID, userID) {
      return (eventUserID === AuthenticationService.getSession().userID);
    };

    Api.getEventById(eventID).then(function(response) {
      editevent._event = response.data.data;
      editevent._event.from = new Date(response.data.data.from);
      editevent._event.to = new Date(response.data.data.to);

      if(!hasPermission(editevent._event.userID, AuthenticationService.getSession().userID)) {
        event.preventDefault();
        editevent.error_message = 'You have to be owner of the event to be able to edit it!';
      }
    }, function(error) {
      event.preventDefault();
      editevent.error_message = 'No event with this ID found!';
    });

    var deleteEvent = function(eventID) {
      Api.deleteEvent(eventID).then(function(response) {
        $state.go('events');
      });
    };

    editevent.removeImage = function() {
      delete editevent._event.picture;
    };

    editevent.saveEvent = function(_event) {
      _event.userID = AuthenticationService.getSession().userID;

      if(typeof(_event.picture) === 'object') {
        Api.uploadImage(_event.picture).then(function(response) {
          _event.picture = response.data.data;
          Api.saveEvent(_event).then(function(response) {
            $state.go('viewevent', { eventID: _event._id });
          });
        });
      } else {
        Api.saveEvent(_event).then(function(response) {
          $state.go('viewevent', { eventID: _event._id });
        });
      }
    };

    editevent.deleteEvent = function(eventID) {
      var confirmToDelete = confirm('Are you sure you want to delete ' + editevent._event.name + '?');
      if(confirmToDelete) {
        deleteEvent(eventID);
      }
    };

    editevent.goBack = function(eventID) {
      $state.go('viewevent', { eventID: eventID });
    };
  }
})();
