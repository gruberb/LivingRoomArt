(function() {
  'use strict';

  angular
    .module('application.detailOpenCall')
    .controller('DetailOpenCallCotrnoller', DetailOpenCallCotrnoller);

  function DetailOpenCallCotrnoller($state, Api, AuthenticationService) {
    var viewopencall = this;
    var opencallID = $state.params.opencallID;

    var deleteOpenCall = function(opencallID) {
      Api.deleteOpenCall(opencallID).then(function(response) {
        $state.go('opencalls');
      });
    };

    viewopencall.isOpenCallOwner = false;

    Api.getOpenCallById(opencallID).then(function(response) {
      viewopencall.opencall = response.data.data;
      viewopencall.isOpenCallOwner = AuthenticationService.getSession().userID == viewopencall.opencall.userID;
      viewopencall.address = viewopencall.opencall.street + " " +
                          viewopencall.opencall.housenumber + "," +
                          viewopencall.opencall.zip + " " +
                          viewopencall.opencall.city;

      viewopencall.hasApplied = !!_.findWhere(viewopencall.opencall.applicants, AuthenticationService.getSession().userID);
    }, function(error) {
      event.preventDefault();
      viewopencall.error_message = 'No OpenCall with this ID found!';
    });

    viewopencall.deleteOpenCall = function(opencallID) {
      var confirmToDelete = confirm('Are you sure you want to delete ' + viewopencall.opencall.name + '?');
      if(confirmToDelete) {
        deleteOpenCall(opencallID);
      }
    };
  }
})();
