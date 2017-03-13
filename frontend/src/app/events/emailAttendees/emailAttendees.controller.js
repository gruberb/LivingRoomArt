(function() {
  'use strict';

  angular
  .module('application.emailAttendees')
  .controller('EmailAttendeesController', EmailAttendeesController);

  function EmailAttendeesController($state, Api, AuthenticationService) {
    var emailattendees = this;
    var eventID = $state.params.eventID;

    emailattendees._event = {};

    var hasPermission = function(eventUserID, userID) {
      return (eventUserID === AuthenticationService.getSession().userID);
    };

    Api.getEventById(eventID).then(function(response) {
      emailattendees._event = response.data.data;

      if(!hasPermission(emailattendees._event.userID, AuthenticationService.getSession().userID)) {
        event.preventDefault();
        emailattendees.error_message = 'You have to be owner of the event to be able to edit it!';
      }
    }, function(error) {
      event.preventDefault();
      emailattendees.error_message = 'No event with this ID found!';
    });

    emailattendees.sendEmail = function(text) {
      var _event = JSON.stringify(emailattendees._event);
      Api.sendEmailToAttendees(_event, text).then(function(response) {
        $state.go('viewevent', { eventID: eventID });
      });
    };

    emailattendees.goBack = function(eventID) {
      $state.go('viewevent', { eventID: eventID });
    };
  }
})();
