(function() {
  'use strict';

  angular
  .module('application.emailAttendees',['ui.router'])
  .config(EmailAttendeesConfig);

  function EmailAttendeesConfig($stateProvider) {
    $stateProvider.state( 'emailattendees', {
      url: '/emailattendees/:eventID',
      views: {
        "main": {
          controller: 'EmailAttendeesController',
          controllerAs: 'emailattendees',
          templateUrl: 'events/emailAttendees/emailAttendees.tpl.html'
        },
        data: { permissionRequired: true }
      }
    });
  }
})();
