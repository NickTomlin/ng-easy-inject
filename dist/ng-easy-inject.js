(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.easyInject = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

/**
 * Adds a list of injectable items to the test context.
 *
 * E.g.
 * beforeEach(easyInject('$http $q'));
 *
 * or
 *
 * beforeEach(eashyInject('http $q', function ($http, $q) {
 *   this.deferred = $q.defer();
 * }))
 *
 * @param {String} toInject - Space delimited list of items to inject
 * @param {Function=} callback - Callback to be invoked injected items as params
 */
module.exports = function (toInject, callback) {
  var injectables = toInject.split(' ');

  function fnToInject (_ /* angular checks for fn.length, so we must provide a useless arg */) {
    var testContext = this;
    var injected = Array.prototype.slice.call(arguments, 0);

    angular.forEach(injected, function (item, index) {
      var name = fnToInject.$inject[index];
      var item = item;
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
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});