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
    .when('/registertraining',{
        templateUrl: 'registertraining.html'
    })
    .otherwise({
 		redirectTo:'/'
 	});
 });

 myApp.controller('loginController', function($rootScope,$scope,$http,$location)
 {
 	$scope.authenticateUser = function () {
        var User = { username: $scope.tm.login.username, password: $scope.tm.login.password};
        console.log(User);
        $http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/login",
					data: User,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
            $rootScope.role = data.empType;
            console.log('role in http'+$rootScope.role);
		 	if(data.empType=='TrainingExecutive')
                $location.path("/admindashboard");
            else if(data.empType=='Trainer')
                $location.path("/trainerdashboard");
            else if(data.empType=='Employee')
                $location.path('/dashboard');
            else 
            {
                $scope.message = 'Username or Password is Wrong';
                $location.path('/');
            }    
                
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured");
                $scope.message = 'Server is down. Please try again after some time';
		 	    $location.path('/');
        });
    }
    
    $scope.navbar = function()
    {
        var role = $rootScope.role;
        if(role == 'TrainingExecutive')
            return 'adminbar.html';
        else if(role == 'Trainer')
            return 'trainerbar.html';
        else if(role == 'Employee')
            return 'userbar.html';
        else
            return '';
    }
    
    $scope.register = function()
    {
        console.log($location);
        $location.path('/dashboard');
    }
   
    
});

 myApp.controller('registerTraining', function($rootScope,$scope,$http,$location)
 {
     $scope.postData = function()
     {
        var training = $scope.training;
        console.log(training); 
     
     
       $http(
				{   method:'POST',
					url:"http://localhost:8080/springmvchibernate/registertraining",
					data: training,
					headers: {'Content-Type' : 'application/json'}
				}
			).success(function(data,status,headers,config) 
				{
                    console.log(data.name);
                
		 }).error(function(data,status,headers,config) 
         {
                console.log("error occured");
                $scope.message = 'Server is down. Please try again after some time';
		 	    $location.path('/');
        });
     }
 });