var smhiApi = "http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/2/geotype/point/lon/15.416/lat/60.496/data.json";

/*
parameters
:
Array[15]
0
:
Object
level
:
2
levelType
:
"hl"
name
:
"t"
unit
:
"Cel"
values
:
Array[1]

*/

function getParameter(weatherObj, paramName){
	var parameter = weatherObj.parameters.filter(function(v){ return v.name === paramName});
	if(parameter && parameter.length > 0){
		return parameter[0].values[0];
	}

	return undefined;
}

angular.module('mirrorApp').factory('smhiservice', function($resource){
	return {
		GetWeather: function(){
			var smhiRes = $resource(smhiApi);
			var result = smhiRes.get();
			result.$promise.then(function()
			{
				for(i = 0;i < result.timeSeries.length;i++){
					var weatherTime = moment(result.timeSeries[i].validTime);
					var now = moment().zone('Z');
					
					if(weatherTime.isSame(now, "hour")){
							var weatherObj = result.timeSeries[i];
							
							result.Temperature = getParameter(weatherObj, 't');
							result.Humidity = getParameter(weatherObj, 'r');
							result.Pressure = getParameter(weatherObj, 'msl');
							result.WindDirection = getParameter(weatherObj, 'wd');
							result.WindSpeed = getParameter(weatherObj, 'ws');
							result.CloudCover = getParameter(weatherObj, 'tcc');
							result.Precipitation = getParameter(weatherObj, 'pit');
							result.PrecipitationType = getParameter(weatherObj, 'pcat');
							
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
			case 1:
				return "snö";
			case 2:
				return "snöblandat regn";
			case 3:
				return "regn";
			case 4:
				return "duggregn";
			case 5:
				return "hagel";
			case 6:
				return "fruset regn";
			default:
				return "fallande gummiankor?";
		}
	}
});
