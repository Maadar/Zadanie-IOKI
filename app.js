(function() {

var app = angular.module("main", []);
    app.controller('ctrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
        $http.get('list.json')
            .success(function(model) {

                $scope.words = model;
            })
            .error(function(model, status){

                $log.error('Unexpected error number:' +status+'');

            });
        $scope.answer = [];
        $scope.checkAnswers = true;   
        $scope.refreshAnswers = false;
        $scope.disableInput = false;
        $scope.inputBlock = "";  
        $scope.isOptionVisible = Array().fill(false);
		$scope.isOptionInvisible = Array().fill(false);

        //function is running for every option in json, forEach loop take as parameters option and index and using option.answer it takes value from answer and index, use compare function, which compare value from input with value in json file and return true or false for images.
        $scope.check = function() {
            $scope.words.options.forEach(function(option, index) {
                console.log(option.answer);
                $scope.inputBlock = option.answer; 
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
            $scope.inputBlock = "";
            $scope.checkAnswers = true;   
            $scope.refreshAnswers = false;
            $scope.disableInput = false;
        };

        var compare = function(answer, response, x) {
            if (answer === response) {
                $scope.isOptionVisible[x] = true;
            } else {
                $scope.isOptionInvisible[x] = true;
            }
        };
	}]);
})();
