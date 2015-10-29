angular.module('mirrorApp').directive('compass', function($timeout, $document, $window){
		return {	
			scope: {
				angle: "="
			},
			restrict: 'E',
			templateUrl: 'app/components/compass/compass.html',
			link : function(scope, element, attr) {
				scope.$watch('angle', function() {
					scope.needlestyle = 
					{

						"behavior": "url(-ms-transform.htc)",
						"-moz-transform": "rotate(" + scope.angle + "deg)",
						"-webkit-transform": "rotate(" + scope.angle + "deg)",
						"-o-transform": "rotate(" + scope.angle + "deg)",
						"-ms-transform": "rotate(" + scope.angle + "deg)"
					};
				});
			}
		}
});