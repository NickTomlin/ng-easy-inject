var baseConfig = require('./karma.conf');

module.exports = function (config, overrides) {
  config.set(baseConfig(config, {
    frameworks: ['jasmine']
  }));
};
