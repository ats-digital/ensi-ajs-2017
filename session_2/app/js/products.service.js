var app = angular.module('ShopApp');

app.service('ProductsService', ['$http', function($http) {

	var self = this;

	this.products = [];

	this.getReviewAverage = function(product) {

		var result = 0;

		if (product.reviews && product.reviews.length) {

			product.reviews.forEach(function(review) {
				result += review.rating;
			})

			return Math.ceil(result / (product.reviews.length));
		}

		return result;

	}

	this.getFullCount = function(product) {
		return new Array(self.getReviewAverage(product));
	}

	this.getEmptyCount = function(product) {
		return new Array(5 - self.getReviewAverage(product));
	}

	this.init = function() {

		if (self.products.length) {
			return;
		}

		$http.get('http://10.128.4.228:3001/products').then(function(response) {

			if (response.data && response.data.products) {
				self.products = response.data.products.map(function(product) {

					product.fullCount = self.getFullCount(product);
					product.emptyCount = self.getEmptyCount(product);

					return product;

				});
			}

		})

	}

	return self;

}])