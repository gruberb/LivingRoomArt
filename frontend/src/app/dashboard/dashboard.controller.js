(function() {
  'use strict';

  angular
  .module('application.dashboard')
  .controller('DashboardController', DashboardController);

  function DashboardController(AuthenticationService, Api) {
    var dashboard = this;
    var userID = AuthenticationService.getSession().userID;

    Api.getEventsByUserId(userID).then(function(response) {
      dashboard.ownevents = response.data.data;
    });

    Api.getEventsByAttendeeId(userID).then(function(response) {
      dashboard.attendevents = response.data.data;
    });

    Api.getOpenCallsByAttendeeId(userID).then(function(response) {
      dashboard.opencalls = response.data.data;
    });

    Api.getOpenCallsByOwnerId(userID).then(function(response) {
      dashboard.ownopencalls = response.data.data;
    });

    Api.getSpacesByUserId(userID).then(function(response) {
      dashboard.spaces = response.data.data;
    });
  }
})();
