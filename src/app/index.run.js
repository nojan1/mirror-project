(function() {
  'use strict';

  angular
    .module('mirrorApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
