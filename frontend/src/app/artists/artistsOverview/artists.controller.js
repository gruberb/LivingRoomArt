(function() {
  'use strict';

  angular
  .module('application.artists')
  .controller('ArtistsController', ArtistsController);

  function ArtistsController($state, Api) {
    var allartists = this;

    Api.getAllArtists().then(function(response) {
      allartists.artists = response.data.data;
    });

    allartists.artistDetails = function(artist) {
      $state.go('viewprofile.about', { userID: artist._id});
    };
  }
})();
