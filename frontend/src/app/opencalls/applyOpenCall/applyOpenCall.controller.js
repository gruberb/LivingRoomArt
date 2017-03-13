(function() {
  'use strict';

  angular
  .module('application.applyOpenCall')
  .controller('ApplyOpenCallController', ApplyOpenCallController);

  function ApplyOpenCallController($state, Api, AuthenticationService) {
    var applyopencall = this;
    var opencallID = $state.params.opencallID;

    var user = {
      userID: AuthenticationService.getSession().userID,
      name: AuthenticationService.getSession().firstName + ' ' + AuthenticationService.getSession().lastName,
      email: AuthenticationService.getSession().email
    };

    applyopencall.opencall = {};

    Api.getOpenCallById(opencallID).then(function(response) {
      applyopencall.opencall = response.data.data;
    });

    applyopencall.apply = function(message) {
      var applicant = {};
      applicant.userID = AuthenticationService.getSession().userID;
      applicant.name = AuthenticationService.getSession().firstName + ' ' + AuthenticationService.getSession().lastName;
      applicant.email = AuthenticationService.getSession().email;
      applicant.message = message;
      applicant.status = 'open';

      applyopencall.opencall.applicant = JSON.stringify(applicant);

      Api.saveOpenCall(applyopencall.opencall).then(function(response) {
        $state.go('viewopencall', { opencallID: opencallID });
      });
    };

    applyopencall.goBack = function(opencallID) {
      $state.go('viewopencall', { opencallID: opencallID });
    };
  }
})();
