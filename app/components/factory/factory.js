app.factory('classFactory', function() {
	return {
		active: false
	}
});

app.factory('dateFactory', function() {
	return {
		date: new Date()
	}
});

app.factory('Data', function($http){
	return {
		getData : function(){
			var test = $http.get('http://ip-api.com/json/?callback=').success(function(res){
				return res;
			});
			return test;
		}
	}
});