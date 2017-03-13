(function() {
  'use strict';

  angular
  .module('application.addOpenCall')
  .controller('AddOpenCollController', AddOpenCollController);

  function AddOpenCollController($state, $rootScope, Api, AuthenticationService, eventCategories, countries) {
    var addopencall = this;
    addopencall.opencall = {};

    addopencall.countries = countries;
    addopencall.categories = eventCategories;

    addopencall.removeImage = function() {
      delete addopencall.opencall.picture;
    };

    addopencall.addOpenCall = function(opencall) {
      opencall.userID = AuthenticationService.getSession().userID;

      if(typeof(opencall.picture) === 'object') {
        Api.uploadImage(opencall.picture).then(function(response) {
          opencall.picture = response.data.data;

          Api.addOpenCall(opencall).then(function(response) {
            $state.go('opencalls');
          });
        });
      } else {
        Api.addOpenCall(opencall).then(function(response) {
          $state.go('opencalls');
        });
      }
    };
  }
})();
