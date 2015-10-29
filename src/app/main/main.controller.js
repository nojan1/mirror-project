  'use strict';

  angular
    .module('mirrorApp')
    .controller('MainController', function($scope, $timeout, smhiservice, googleservice, minecraftservice, xkcdservice, quoteservice, foodservice){
	//Tab switching
	function switchTab() {
		if(!$scope.tab){
			$scope.tab = 1;
		}else{
			$scope.tab += 1;
			
			if($scope.tab > 3){
				$scope.tab = 1;
			}
		}
		
		$timeout(function(){
			switchTab();
		}, 1000 * 30); //Timeout 30 sec
	}
	
	//Data stuff
	function getData(){
		googleservice.Login();
		
		$scope.weather = smhiservice.GetWeather();	
		$scope.events = googleservice.GetEvents($scope);
		minecraftservice.GetServers(function(servers){
			$scope.minecraftServers = servers;
		});
		
		xkcdservice.GetXkcd(function(xkcdarg){
			$scope.xkcd = xkcdarg;
		});
		
		quoteservice.GetQuote(function(quoteArg){
			$scope.quote = quoteArg;
		});
		
		foodservice.GetFood(function(foodArg){
			$scope.food = foodArg;
		});
		
		$timeout(function(){
			getData();
		}, 1000 * 60 * 50); //Timeout 50 min
	}
		
	//Clock handling
	function updateTime(){
		$scope.time = moment().format("HH:mm");
		$scope.date = moment().format("DD MMMM YYYY");
		
		$timeout(function(){
			updateTime();
		}, 1000);
	}
	
	updateTime();
	getData();
	switchTab();
  });3