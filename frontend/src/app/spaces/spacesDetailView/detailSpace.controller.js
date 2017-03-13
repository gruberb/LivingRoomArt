(function() {
  'use strict';

  angular
    .module('application.detailSpace')
    .controller('DetailSpaceController', DetailSpaceController);

  function DetailSpaceController($state, Api, AuthenticationService) {
    var viewspace = this;
    var spaceID = $state.params.spaceID;

    var deleteSpace = function(spaceID) {
      Api.deleteSpace(spaceID).then(function(response) {
        $state.go('spaces');
      });
    };

    var getTimeDifference = function(_from, _to) {
      if(!_from || !_to) {
        return null;
      }

      var d1 = moment(_from);
      var d2 = moment(_to);
      return moment.duration(d2.diff(d1)).asDays();
    };

    viewspace.isSpaceOwner = false;

    Api.getSpaceById(spaceID).then(function(response) {
      viewspace.space = response.data.data;
      viewspace.isSpaceOwner = AuthenticationService.getSession().userID == viewspace.space.userID;
      viewspace.address = viewspace.space.street + " " +
                          viewspace.space.housenumber + "," +
                          viewspace.space.zip + " " +
                          viewspace.space.city;
      viewspace.difference = getTimeDifference(viewspace.space.from, viewspace.space.to);
    }, function(error) {
      event.preventDefault();
      viewspace.error_message = 'No space with this ID found!';
    });

    viewspace.editSpace = function(spaceID) {
      $state.go('editspace', { spaceID: spaceID });
    };

    viewspace.deleteSpace = function(spaceID) {
      var confirmToDelete = confirm('Are you sure you want to delete ' + viewspace.space.name + '?');
      if(confirmToDelete) {
        deleteSpace(spaceID);
      }
    };
  }
})();
