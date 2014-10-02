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
			$scope.genreFilter = null;
			$scope.availableGenres = [];
			$scope.orderFields = ['Air Date', 'Rating'];
		    $scope.orderDirections = ['Descending', 'Ascending'];
		    $scope.orderField = 'Air Date'; //Default order field
		    $scope.orderReverse = 'false';
			$scope.results = [];

			$scope.init = function() {
				// API requires a start date
				var today = new Date();
				// Create the date string and ensure leading zeros if required
				var apiDate = today.getFullYear() + ('0' + (today.getMonth() + 1)).slice(-2) + '' + ('0' + today.getDate()).slice(-2);
				$http.jsonp(
						'http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(
						function(data) {

							angular.forEach(data, function(value) {

								var date = value.date;

								angular.forEach(value.episodes, function(
										tvshow) {

									tvshow.date = date;

									$scope.results.push(tvshow);
									
									//Loop through each genre for this episode
			                        angular.forEach(tvshow.show.genres, function(genre){
			                            //Only add to the availableGenres array if it doesn't already exist
			                            var exists = false;
			                            angular.forEach($scope.availableGenres, function(avGenre){
			                                if (avGenre === genre) {
			                                    exists = true;
			                                }
			                            });
			                            if (exists === false) {
			                                $scope.availableGenres.push(genre);
			                            }
			                        });
									
								});
							});
						}).error(function(error) {
							console.log(error);
				});
			};
			
			$scope.customOrder = function(tvshow) {
		        switch ($scope.orderField) {
		            case 'Air Date':
		                return tvshow.episode.first_aired;		                
		            case 'Rating':
		                return tvshow.episode.ratings.percentage;		                
		        }
		    };
		    
		    $scope.setGenreFilter = function(genre) {
		        $scope.genreFilter = genre;
		    };

		});
