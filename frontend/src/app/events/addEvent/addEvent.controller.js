(function() {
  'use strict';

  angular
  .module('application.addEvent')
  .controller('AddEventController', AddEventController);

  function AddEventController($state, $rootScope, Api, AuthenticationService, eventCategories, countries) {
    var addevent = this;
    addevent._event = {};
    addevent._event.attendees = [];

    addevent.countries = countries;
    addevent.categories = eventCategories;

    addevent._event.attendee = JSON.stringify({
      userID: AuthenticationService.getSession().userID,
      name: AuthenticationService.getSession().firstName + ' ' + AuthenticationService.getSession().lastName,
      email: AuthenticationService.getSession().email
    });

    addevent.removeImage = function() {
      delete addevent._event.picture;
    };

    addevent.addEvent = function(_event) {
      _event.userID = AuthenticationService.getSession().userID;

      if(typeof(_event.picture) === 'object') {
        Api.uploadImage(_event.picture).then(function(response) {
          _event.picture = response.data.data;

          Api.addEvent(_event).then(function(response) {
            $state.go('events');
          });
        });
      } else {
        Api.addEvent(_event).then(function(response) {
          $state.go('events');
        });
      }
    };
  }
})();
