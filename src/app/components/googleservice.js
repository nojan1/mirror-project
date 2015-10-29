angular.module('mirrorApp').factory('googleservice', function(googleLogin, googleCalendar, googlePlus){
	function doGetEvents(events){
		 googleCalendar.listCalendars().then(function(calendars){
			if(events.length > 0)
				events.length = 0;
				
			timeMinArg = moment().format('YYYY-MM-DD[T00:00:00Z]');
			timeMaxArg = moment().add(7, "days").format('YYYY-MM-DD[T00:00:00Z]');
			
			for(i = 0; i < calendars.length;i++){
				googleCalendar.listEvents({calendarId: calendars[i].id, timeMin:timeMinArg, timeMax:timeMaxArg}).then(function(eventsArg){
					if(eventsArg.length == 0)
						return;
						
					events.push.apply(events, eventsArg);
					
					// $timeout(function() {
						// $scope.$apply();
					// })
					
					events.sort(function(a,b){
						x = moment(a.start.dateTime ? a.start.dateTime : a.start.date);
						y = moment(b.start.dateTime ? b.start.dateTime : b.start.date);
						
						return ((x < y) ? -1 : ((x > y) ? 1 : 0));
					});
				});
			}	
	   });
	   
	   return events;
	}

	var isAuthed = false;
	
	return {
		Login: function(){
			function checkAuth() {
			   setTimeout(function(){
				   gapi.auth === undefined ? checkAuth() : googleLogin.checkAuth();
			   }, 20);
			}
			checkAuth();
		},
		
		GetEvents: function($scope, oldEvents){
			if(this.isAuthed){
				return doGetEvents(oldEvents)	
			}else{
				events = []
				$scope.$on("google:authenticated", function(){
					isAuthed = true;
					
					 $scope.$on('googleCalendar:loaded', function(){
						//work your magic here
						doGetEvents(events);
				   });
				});
				
				return events;
			}
		}
	}
});