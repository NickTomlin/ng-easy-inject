'use strict';

var easyInject = require('../');
var assert = require('assert');
var sinon = require('sinon');

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
    var spy = sinon.stub();

    beforeEach(easyInject('$http $q', spy));
    afterEach(function () { spy.reset(); });

    it('invokes callback with injected arguments', function () {
      assert(this.$http.get);
      assert(this.$q.defer);
      assert.equal(spy.callCount, 1);
    });

    it('invokes callback once per block', function () {
      assert(this.$http.get);
      assert(this.$q.defer);
      assert.equal(spy.callCount, 1);
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

    it('accepts an array of injectable names', function (done) {
      easyInject(['$window', '$q'], function ($window, $q) {
        assert($window.location);
        assert($q.defer);
        done();
      })();
    });
  });
});
