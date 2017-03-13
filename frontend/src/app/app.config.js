(function() {
  'use strict';

  angular
    .module('application')
    .config(ApplicationConfig);

  function ApplicationConfig($urlRouterProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
    $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
      var key, result = [];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
      }
      return result.join("&");
    });

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('HttpInterceptors');
    cfpLoadingBarProvider.includeSpinner = false;
    $locationProvider.html5Mode({ enabled: true, requireBase: true });
    $locationProvider.hashPrefix('!');
  }
})();
