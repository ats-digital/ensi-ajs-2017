var app = angular.module('ShopApp', ['ngRoute']);


app.config(function ($routeProvider) {

	$routeProvider.when("/", {
		templateUrl : "global.html",
		controller: "ProductsCtrl"
	})

	$routeProvider.when("/details", {
		templateUrl: "details.html",
		controller: "SingleProductCtrl"
	})

	$routeProvider.otherwise({ redirectTo: '/' })
	
})

app.controller('ProductsCtrl', [
	'$scope',
	'$http',
	'$sce',
	function($scope, $http, $sce) {

		$scope.title = 'My Products Page';

		$scope.products = [];

		$scope.ratingSymbols = {
			empty: '&#9734;',
			full: '&#9733;'
		}


		$http.get('http://10.128.4.228:3001/products').then(function(response) {

			if (response.data && response.data.products) {
				$scope.products = response.data.products.map(function(product) {

					product.fullCount = $scope.getFullCount(product);
					product.emptyCount = $scope.getEmptyCount(product);

					return product;

				});
			}

		})

		$scope.deduplicate = function(arr) {

			var result = [];

			if (!arr.length) {
				return result;
			}

			arr.forEach(function(elem) {
				if (result.indexOf(elem) === -1) {
					result.push(elem);
				}
			})

			return result;
		}


		$scope.getDistinctCategories = function() {

			if ($scope.products && $scope.products.length) {
				return $scope.deduplicate(
					$scope.products.map(
						function(product) {
							return product.category;
						}
					)
				);
			}

			return [];
		}


		$scope.getReviewAverage = function(product) {

			var result = 0;

			if (product.reviews && product.reviews.length) {

				product.reviews.forEach(function(review) {
					result += review.rating;
				})

				return Math.ceil(result / (product.reviews.length));
			}

			return result;

		}

		$scope.getFullCount = function(product) {
			return new Array($scope.getReviewAverage(product));
		}

		$scope.getEmptyCount = function(product) {
			return new Array(5 - $scope.getReviewAverage(product));
		}

	}
])