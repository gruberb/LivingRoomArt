(function() {
  'use strict';

  angular
    .module('application')
    .controller('ApplicationController', ApplicationController);

  function ApplicationController($state, $rootScope, AuthenticationService) {
    var app = this;

    if(AuthenticationService.getSession().userID) {
      AuthenticationService.setAuthenticationHeader();
      $rootScope.firstname = AuthenticationService.getSession().firstName;
      $rootScope.userID = AuthenticationService.getSession().userID;
    }

    app.logout = function() {
      AuthenticationService.logout();
      $state.go($state.$current, null, { reload: true });
    };
  }
})();
