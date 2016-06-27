 myApp = angular.module('mainApp', ['ngRoute']);

 myApp.config(function($routeProvider) {
 	$routeProvider
 	.when('/',{
 		templateUrl: 'login.html'
 	})
    .when('/admindashboard',{
        templateUrl: 'admindashboard.html'
    })
    .when('/trainerdashboard',{
    templateUrl: 'tdashboard.html'
    })
    .when('/dashboard',{
        templateUrl: 'dashboard.html'
    })
    .otherwise({
 		redirectTo:'/'
 	});
 });

 myApp.controller('loginController', function($scope,$http,$location)
 {
 	$scope.authenticateUser = function () {
 		var User = { username: $scope.tm.login.username, password: $scope.tm.login.password};
 		$http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/login",
					data: User,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
            console.log("Success");
            console.log("EmpType: "+data.empType);
		 	if(data.empType=='TrainingExecutive')
                $location.path("/admindashboard");
            else if(data.empType=='Trainer')
                $location.path("/trainerdashboard");
            else if(data.empType=='Employee')
                $location.path('/dashboard');
            else 
                $location.path('/')
                
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured")
		 	    $location.path('/')
        });
    }
});