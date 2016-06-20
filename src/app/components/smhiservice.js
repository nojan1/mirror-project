var smhiApi = "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/2/geotype/point/lon/15.416/lat/60.496/data.json";

angular.module('mirrorApp').factory('smhiservice', function($resource){
	return {
		GetWeather: function(){
			var smhiRes = $resource(smhiApi);
			var result = smhiRes.get();
			result.$promise.then(function()
			{
				for(i = 0;i < result.timeseries.length;i++){
					var weatherTime = moment(result.timeseries[i].validTime);
					var now = moment().zone('Z');
					
					// if(weatherTime.get('date') == now.get('date') &&
						// weatherTime.get('hour') == now.get('hour')){
							// console.log(result.timeseries[i]);
							// break;
					// }
					
					if(weatherTime.isSame(now, "hour")){
							var weatherObj = result.timeseries[i];
							
							result.Temperature = weatherObj.t;
							result.Humidity = weatherObj.r;
							result.Pressure = weatherObj.msl;
							result.WindDirection = weatherObj.wd;
							result.WindSpeed = weatherObj.ws;
							result.CloudCover = weatherObj.tcc;
							result.Precipitation = weatherObj.pit;
							result.PrecipitationType = weatherObj.pcat;
							
							break;
					}
				}
			});
			
			return result;
		}
	};
});

angular.module('mirrorApp').filter("AngleToEightStep", function(){
	return function(angle){
		return Math.floor(angle / 45);
	}
});

angular.module('mirrorApp').filter("PrecipitationTypeToString", function(){
	return function(precipitationType){
		switch(precipitationType){
			case 0:
				return "ingen nederbörd";
				break;
			case 1:
				return "snö";
				break;
			case 2:
				return "snöblandat regn";
				break;
			case 3:
				return "regn";
				break;
			case 4:
				return "duggregn";
				break;
			case 5:
				return "hagel";
				break;
			case 6:
				return "fruset regn";
				break;
			default:
				return "fallande gummiankor?";
		}
	}
});
