(function() {
  'use strict';

  angular
  .module('application.login')
  .controller('LoginController', LoginController);

  function LoginController($state, $rootScope, $location, AuthenticationService) {
    var login = this;

    login.login = function(credentials) {
      AuthenticationService.login(credentials).then(function(response) {
        AuthenticationService.setAuthenticationHeader();
        $rootScope.firstname = response.data.data.firstName;
        $rootScope.userID = response.data.data._id;
        $state.go('events');
      }, function(error) {
        login.error_message = error.data.message;
      });
    };
  }
})();
