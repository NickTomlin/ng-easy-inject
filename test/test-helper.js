'use strict';

require('angular');
require('angular-mocks');

beforeEach(function () {
  angular.module('testApp', [])
    .controller('TestAppController', function ($scope, $http) {
      void $http;
    });
});
