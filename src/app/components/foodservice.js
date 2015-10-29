angular.module('mirrorApp').factory('foodservice', function($http){
	return {
		GetFood: function(callback){
			$http.get("http://localhost/mirror/backend/food.php").success(callback);
		}
	};
});