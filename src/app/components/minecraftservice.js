angular.module('mirrorApp').factory('minecraftservice', function($http){
	return {
		GetServers: function(callback){
			$http.get("http://nyclon.crabdance.com/minecraft/backend/servers.php").success(callback);
		}
	};
});

angular.module('mirrorApp').filter("join", function(){
		return function(input, delimiter){
			if(!input)
				return "";
		
			var ret = "";
			input.forEach(function(item, index){
				ret += item;
				
				if(index != input.length -1 ){
					ret += delimiter;
				}
			});
			
			return ret;
		}
	});