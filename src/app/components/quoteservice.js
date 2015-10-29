angular.module('mirrorApp').factory('quoteservice', function($http){
	return {
		 GetQuote: function(callback){
			$http.get("/mirror/backend/quote.php").success(callback);
		}
	};
});

angular.module('mirrorApp').filter('nl2br', function($sce){
      return function(text) {
            return text ? $sce.trustAsHtml(text.replace(/\n/g, '<br/>')) : '';
      }
});