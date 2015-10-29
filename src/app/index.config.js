(function() {
  'use strict';

  angular
    .module('mirrorApp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, googleLoginProvider, $sceDelegateProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
	  
  	googleLoginProvider.configure({
            clientId: '816476173717-37a48fudg2l0r433mdopipq57jt6h587.apps.googleusercontent.com',
            scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/plus.login"]
        });
	  
	 $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://opendata-download-metfcst.smhi.se', 'http://xkcd.com']); 
  }

})();
