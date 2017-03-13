angular
  .module( 'authentication')
  .service('AuthenticationSession', AuthenticationSession);

function AuthenticationSession(localStorageService) {
  this.userID = localStorageService.get('userID') || null;
  this.token = localStorageService.get('token') || null;
  this.firstName = localStorageService.get('firstName') || null;
  this.lastName = localStorageService.get('lastName') || null;
  this.email = localStorageService.get('email') || null;

  this.create = function(data) {
    this.userID = data.data.data._id;
    this.token = data.data.token;
    this.firstName = data.data.data.firstName;
    this.lastName = data.data.data.lastName;
    this.email = data.data.data.email;

    localStorageService.set('userID', data.data.data._id);
    localStorageService.set('token', data.data.token);
    localStorageService.set('firstName', data.data.data.firstName);
    localStorageService.set('lastName', data.data.data.lastName);
    localStorageService.set('email', data.data.data.email);
  };

  this.destroy = function() {
    this.userID = null;
    this.token = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;

    localStorageService.remove('userID');
    localStorageService.remove('token');
    localStorageService.remove('firstName');
    localStorageService.remove('lastName');
    localStorageService.remove('email');
  };
}
