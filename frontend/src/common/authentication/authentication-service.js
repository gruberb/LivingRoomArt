angular
  .module( 'authentication', ['LocalStorageModule'])
  .factory('AuthenticationService', AuthenticationService);

function AuthenticationService(AuthenticationSession, Api, $http, $q) {
  var authService = {};

  authService.login = function(credentials) {
    var deferred = $q.defer();

    Api.login(credentials).then(function(response) {
      AuthenticationSession.create(response);
      deferred.resolve(response);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  authService.register = function(newUser) {
    var deferred = $q.defer();

    Api.register(newUser).then(function(response) {
      deferred.resolve(response);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  };

  authService.getSession = function() {
    return AuthenticationSession;
  };

  authService.logout = function() {
    AuthenticationSession.destroy();
  };

  authService.isLoggedIn = function() {
    return !!AuthenticationSession.userID;
  };

  authService.setAuthenticationHeader = function() {
    $http.defaults.headers.common['x-access-token'] = AuthenticationSession.token;
  };

  return authService;
}
