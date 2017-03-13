(function() {
  'use strict';

  angular
    .module('application.viewProfile', ['ui.router'])
    .config(ViewProfileConfig);

  function ViewProfileConfig($stateProvider) {
    $stateProvider.state( 'viewprofile', {
      url: '/viewprofile/:userID',
      views: {
        "main": {
          controller: 'ViewProfileController',
          controllerAs: 'viewprofile',
          templateUrl: 'profile/viewProfile/viewProfile.tpl.html'
        }
      }
    })
    .state( 'viewprofile.about', {
      url: '/about',
      views: {
        "detailsContent": {
          templateUrl: 'profile/viewProfile/about.tpl.html'
        }
      }
    })
    .state( 'viewprofile.projects', {
      url: '/projects',
      views: {
        "detailsContent": {
          templateUrl: 'profile/viewProfile/projects.tpl.html'
        }
      }
    });
  }
})();
