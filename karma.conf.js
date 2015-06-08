'use strict';

var merge = require('lodash.merge');
var isArray = require('lodash.isarray');

module.exports = function(karmaConfig, overrides) {
  var defaults = {

    basePath: '',

    frameworks: ['browserify', 'phantomjs-shim'],

    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },

    files: [
      'test/test-helper.js',
      'test/main.test.js'
    ],

    reporters: ['progress'],

    browserify: {
      debug: true
    },

    port: 9876,

    colors: true,

    logLevel: karmaConfig.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  };

  return merge(defaults, overrides, function (a, b) {
    return isArray(a) ? a.concat(b) : undefined;
  });
};
