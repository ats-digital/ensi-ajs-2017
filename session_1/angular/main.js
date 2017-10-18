var app = angular.module('TodoApp', []);

app.controller('TodoCtrl', ['$scope', function($scope) {

	$scope.title = "My Awesome Todo application";

	$scope.selectedTodo = {
		label: "",
		done: false
	};

	$scope.todos = [];

	$scope.addTodo = function() {
		$scope.todos.push($scope.selectedTodo);
	}

	$scope.removeTodo = function(index) {
		$scope.todos.splice(index, 1);
	}

	$scope.toggleState = function(index) {
		$scope.todos[index].done = !$scope.todos[index].done;
	}

}])

app.directive('ngBlue', [function() {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			iElement.css('color', 'blue');
		}
	};
}])