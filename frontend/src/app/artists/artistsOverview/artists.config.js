(function() {
  'use strict';

  angular
    .module('application.artists',['ui.router'])
    .config(ArtistsConfig);

  function ArtistsConfig($stateProvider) {
    $stateProvider.state( 'artists', {
      url: '/artists',
      views: {
        "main": {
          controller: 'ArtistsController',
          controllerAs: 'allartists',
          templateUrl: 'artists/artistsOverview/artists.tpl.html'
        }
      }
    });
  }
})();
