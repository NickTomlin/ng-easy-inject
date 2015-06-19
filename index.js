'use strict';

/**
 * Adds a list of injectable items to the test context.
 *
 * E.g.
 * beforeEach(easyInject('$http $q'));
 *
 * or
 *
 * beforeEach(easyInject('http $q', function ($http, $q) {
 *   this.deferred = $q.defer();
 * }))
 *
 * @param {String} toInject - Space delimited list of items to inject
 * @param {Function=} callback - Callback to be invoked injected items as params
 * @returns undefined
 */
module.exports = function (toInject, callback) {
  var injectables = toInject.split(' ');

  // angular checks for fn.length, so we must provide a useless _ arg
  function fnToInject (_) { // eslint-disable-line no-unused-vars
    var testContext = this;
    var injected = Array.prototype.slice.call(arguments, 0);

    angular.forEach(injected, function (item, index) {
      var name = fnToInject.$inject[index];
      testContext[name] = item;
      if (callback) {
        callback.apply(testContext, injected);
      }
    });
  }

  fnToInject.toString = function () {
    return 'function (' + injectables.join(', ') + ') { \n void 0;\n }';
  };

  return function mochaInject () {
    global.angular.mock.inject.call(this, fnToInject);
  };
};
