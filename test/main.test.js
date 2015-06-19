'use strict';

var easyInject = require('../');
var assert = require('assert');

describe('ng-easy-inject', function () {
  describe('autoinjection', function () {
    beforeEach(easyInject('$http $q'));

    it('adds injected modules to current context (this)', function () {
      assert(this.$http.get);
      assert(this.$q.defer);
    });

    describe('nested', function () {
      beforeEach(easyInject('$window'));

      it('works multiple specs', function () {
        assert(this.$window);
        assert(this.$http.get);
        assert(this.$q.defer);
      });
    });
  });

  describe('with a callback', function () {
    var called;

    beforeEach(easyInject('$http $q', function ($http, $q) {
      called = [$http, $q];
    }));
    afterEach(function () { called = undefined; }); // eslint-disable-line no-undefined

    it('invokes callback with injected arguments', function () {
      assert.equal(called.length, 2);
      assert(this.$http.get);
      assert(this.$q.defer);
    });
  });

  describe('options', function () {
    it('works with a string of space separated injectable names', function (done) {
      easyInject('$http $q', function ($http, $q) {
        assert($http.get);
        assert($q.defer);
        done();
      })();
    });
  });
});
