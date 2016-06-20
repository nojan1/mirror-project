angular.module('mirrorApp').factory('foodservice', function($http){
	return {
		GetFood: function(callback){
			$http.get("http://nyclon.crabdance.com/mirror/backend/food.php").success(callback);
		}
	};
});