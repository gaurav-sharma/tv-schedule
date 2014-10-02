'use strict';

/**
 * @ngdoc filter
 * @name yoAngularApp.filter:isGenre
 * @function
 * @description
 * # isGenre
 * Filter in the yoAngularApp.
 */
angular.module('yoAngularApp')
  .filter('isGenre', function () {
    return function (input, genre) {
    	if (typeof genre === 'undefined' || genre === null) {
            return input;
        } else {
            var out = [];
            for (var a = 0; a < input.length; a++){
                for (var b = 0; b < input[a].show.genres.length; b++){
                    if(input[a].show.genres[b] === genre) {
                        out.push(input[a]);
                    }
                }
            }
            return out;
        }
    };
  });
