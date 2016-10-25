(function() {

	var app = angular.module("main", []);
    app.controller('ctrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
        $http.get('list.json')
            .success(function(model, id) {

                $scope.words = model;
                console.log($scope.words);

            })
            .error(function(model, status){

                $log.error('Unexpected error number:' +status+'');

            });
        $scope.answers = {};
        $scope.checkAnswers = true;   
        $scope.refreshAnswers = false;
        $scope.inputBlock = false;     
        $scope.isOptionVisible = Array(7).fill(false);
		$scope.isOptionInvisible = Array(7).fill(false);

        //function is running for every option in json, forEach loop take as parameters option and index and using option.answer it takes value from answer and index, use compare function, which compare value from input with value in json file and return true or false for images.
        $scope.check = function() {
            $scope.words.options.forEach(function(option, index) {
                compare(option.answer, $scope.answer[index], index);
            });
            $scope.checkAnswers = false;
            $scope.refreshAnswers = true;
            $scope.inputBlock = true;  
        };
        //activities for refresh button
        $scope.refresh = function() {
            $scope.isOptionVisible = Array(7).fill(false);
            $scope.isOptionInvisible = Array(7).fill(false);
            $scope.checkAnswers = true;   
            $scope.refreshAnswers = false;
            $scope.inputBlock = false;
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
