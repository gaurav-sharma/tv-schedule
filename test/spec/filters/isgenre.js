'use strict';

describe('Filter: isGenre', function () {

  // load the filter's module
  beforeEach(module('yoAngularApp'));

  // initialize a new instance of the filter before each test
  var isGenre;
  beforeEach(inject(function ($filter) {
    isGenre = $filter('isGenre');
  }));

});
