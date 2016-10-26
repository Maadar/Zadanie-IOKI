(function() {

var app = angular.module("mainModule", ['ngRoute']);

    //routing section
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'nextTask.html' 
            })
            .when('/nextTask', {
                templateUrl: 'previoousTask.html' 
            });  
    }])
    
    app.controller('mainController', ['$scope', '$http', '$log', function($scope, $http, $log) {
        $http.get('list1.json')
            .success(function(model) {
                //get data from json file 
                $scope.words = model;
            })
            .error(function(model, status){
                //if something goes wrong, show error log
                $log.error('Unexpected error number:' +status+'');

            });
        //set values to variables
        $scope.answer = [];
        $scope.checkAnswers = true;   
        $scope.refreshAnswers = false;
        $scope.inputBlock = [];  
        $scope.isOptionVisible = Array().fill(false);
		$scope.isOptionInvisible = Array().fill(false);

        //check button
        $scope.check = function() {
            $scope.words.options.forEach(function(option, index) {
                $scope.inputBlock[index] = option.answer;
                compare(option.answer, $scope.answer[index], index);
            });
            $scope.disableInput = true;
            $scope.checkAnswers = false;
            $scope.refreshAnswers = true;
        };
        //activities for refresh button
        $scope.refresh = function() {
            $scope.isOptionVisible = Array().fill(false);
            $scope.isOptionInvisible = Array().fill(false);
            $scope.inputBlock = [];
            $scope.checkAnswers = true;   
            $scope.refreshAnswers = false;
            $scope.disableInput = false;
        };
        //conpare value from input and json file
        var compare = function(answer, response, x) {
            if (answer === response) {
                $scope.isOptionVisible[x] = true;
            } else {
                $scope.isOptionInvisible[x] = true; 
            }
        };
	}]);
})();