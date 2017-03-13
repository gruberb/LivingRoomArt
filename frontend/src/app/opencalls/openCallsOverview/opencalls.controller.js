(function() {
  'use strict';

  angular
  .module('application.opencalls')
  .controller('OpenCallsController', OpenCallsController);

  function OpenCallsController($state, Api) {
    var allopencalls = this;

    Api.getAllOpenCalls().then(function(response) {
      allopencalls.opencalls = response.data.data;
    });
  }
})();
