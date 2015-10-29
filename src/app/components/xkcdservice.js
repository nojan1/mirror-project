angular.module('mirrorApp').factory('xkcdservice', function($http){
	return {
		GetXkcd: function(callback){
			$http.get("/mirror/backend/xkcd.php").success(callback);
		}
	};
});