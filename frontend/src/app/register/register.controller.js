(function() {
  'use strict';

  angular
  .module('application.register')
  .controller('RegisterController', RegisterController);

  function RegisterController($state, AuthenticationService) {
    var register = this;

    register.register = function(newUser) {
      AuthenticationService.register(newUser).then(function(response) {
        $state.go('login');
      }, function(failure) {
        if(failure.data.error.code === 11000) {
          register.register_error = "E-Mail is already taken.";
        }
      });
    };
  }
})();
