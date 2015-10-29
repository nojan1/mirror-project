(function() {
  'use strict';

  angular
    .module('mirrorApp', ['ngResource', 'ngRoute', 'toastr', 'ngAnimate', 'googleApi'])
  
    .filter('unsafe', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
	})
	
	.filter("join", function(){
		return function(input, delimiter){
			if(!input)
				return "";
		
			var ret = "";
			input.forEach(function(item, index){
				ret += item;
				
				if(index == input.length - 1){
					ret += delimiter;
				}
			});
			
			return ret;
		}
	});

})();
