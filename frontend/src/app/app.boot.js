(function() {
  'use strict';

  angular
  .module('application', [
    'templates-app',
    'templates-common',
    'api',
    'interceptors',
    'authentication',
    'application.home',
    'application.dashboard',
    'application.login',
    'application.register',
    'application.spaces',
    'application.addSpace',
    'application.editSpace',
    'application.detailSpace',
    'application.events',
    'application.addEvent',
    'application.editEvent',
    'application.detailEvent',
    'application.emailAttendees',
    'application.viewProfile',
    'application.editProfile',
    'application.addProject',
    'application.editProject',
    'application.artists',
    'application.opencalls',
    'application.addOpenCall',
    'application.editOpenCall',
    'application.detailOpenCall',
    'application.manageOpenCall',
    'application.applyOpenCall',
    'application.imprint',
    'ui.router',
    'angularTrix',
    'ngSanitize',
    'angular-loading-bar',
    'ngFileUpload',
    'angulartics',
    'angulartics.google.analytics'
  ])
  .run(run);

  function run($rootScope, $state, $location, AuthenticationService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $rootScope.isLoggedIn = AuthenticationService.isLoggedIn();
    });
  }
})();
