(function() {
  'use strict';

  angular
    .module('application.manageOpenCall')
    .controller('ManageOpenCallController', ManageOpenCallController);

  function ManageOpenCallController($state, Api, AuthenticationService) {
    var manageopencall = this;
    var opencallID = $state.params.opencallID;

    var hasPermission = function(opencallID, userID) {
      return opencallID === userID;
    };

    Api.getOpenCallById(opencallID).then(function(response) {
      manageopencall.opencall = response.data.data;

      if(!hasPermission(manageopencall.opencall.userID, AuthenticationService.getSession().userID)) {
        event.preventDefault();
        manageopencall.error_message = 'You have to be owner of the OpenCall to be able to manage it!';
      }
    });

    manageopencall.showDetails = function(selected) {
      Api.getUserById(selected.userID).then(function(response) {
        manageopencall.applicant = response.data.data;
        manageopencall.applicant.message = selected.message;
        manageopencall.applicant.status = selected.status;
      });
    };

    manageopencall.accept = function(applicant) {
      var accepted = {};
      accepted.userID = applicant._id;
      accepted.name = applicant.firstName + ' ' + applicant.lastName;
      accepted.email = applicant.email;
      accepted.message = applicant.message;
      accepted.status = 'accepted';

      manageopencall.opencall.applicant = JSON.stringify(accepted);

      Api.saveOpenCall(manageopencall.opencall).then(function(response) {
        $state.go($state.$current, null, { reload: true });
      });
    };

    manageopencall.reject = function(applicant) {
      var rejected = {};
      rejected.userID = applicant._id;
      rejected.name = applicant.firstName + ' ' + applicant.lastName;
      rejected.email = applicant.email;
      rejected.message = applicant.message;
      rejected.status = 'rejected';

      manageopencall.opencall.applicant = JSON.stringify(rejected);

      Api.saveOpenCall(manageopencall.opencall).then(function(response) {
        $state.go($state.$current, null, { reload: true });
      });
    };
  }
})();
