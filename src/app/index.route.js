(function() {
  'use strict';

  angular
    .module('mirrorApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
