var app = angular.module('ShopApp', ['ngRoute']);


app.config(function($routeProvider) {

	$routeProvider.when("/", {
		templateUrl: "global.html",
		controller: "ProductsCtrl"
	})

	$routeProvider.when("/details", {
		templateUrl: "details.html",
		controller: "ProductsCtrl"
	})

	$routeProvider.otherwise({
		redirectTo: '/'
	})

})


app.controller('ProductsCtrl', [
	'$scope',
	'$http',
	'$sce',
	'$location',
	'ProductsService',

	function($scope, $http, $sce, $location, ProductsService) {

		$scope.title = 'My Products Page';
		$scope.ProductsService = ProductsService;

		$scope.ProductsService.init();

		$scope.ratingSymbols = {
			empty: '&#9734;',
			full: '&#9733;'
		}

		$scope.goToSingleProduct = function(product) {
			ProductsService.selectedProduct = product;
			$location.path('/details');
		}

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

			if (ProductsService.products && ProductsService.products.length) {
				return $scope.deduplicate(
					ProductsService.products.map(
						function(product) {
							return product.category;
						}
					)
				);
			}

			return [];
		}



	}
])