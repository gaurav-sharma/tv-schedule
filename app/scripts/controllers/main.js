'use strict';

/**
 * @ngdoc function
 * @name yoAngularApp.controller:MainCtrl
 * @description # MainCtrl Controller of the yoAngularApp
 */
angular.module('yoAngularApp').controller(
		'MainCtrl',
		function($scope, $http, API_KEY) {
			$scope.apiKey = API_KEY;
			$scope.filterText = null;
			$scope.results = [];

			$scope.init = function() {
				// API requires a start date
				var today = new Date();
				// Create the date string and ensure leading zeros if required
				var apiDate = today.getFullYear()
						+ ("0" + (today.getMonth() + 1)).slice(-2) + ""
						+ ("0" + today.getDate()).slice(-2);
				$http.jsonp(
						'http://api.trakt.tv/calendar/premieres.json/'
								+ $scope.apiKey + '/' + apiDate + '/' + 30
								+ '/?callback=JSON_CALLBACK').success(
						function(data) {

							angular.forEach(data, function(value, index) {

								var date = value.date;

								angular.forEach(value.episodes, function(
										tvshow, index) {

									tvshow.date = date;

									$scope.results.push(tvshow);
								});
							});
						}).error(function(error) {

				});
			};

		});
