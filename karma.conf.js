'use strict';

var merge = require('lodash.merge');
var isArray = require('lodash.isarray');
var FRAMEWORK = process.env.KARMA_FRAMEWORK || 'mocha';

module.exports = function(config, overrides) {
  console.log('Running karma specs with', FRAMEWORK);

  var defaults = {

    basePath: '',

    frameworks: ['browserify', 'phantomjs-shim', FRAMEWORK],

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

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  };

  if (overrides) {
    return merge(defaults, overrides, function (a, b) {
      return isArray(a) ? a.concat(b) : undefined;
    });
  } else {
    config.set(defaults);
  }
};
