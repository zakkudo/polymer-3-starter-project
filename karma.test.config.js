const webpack = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/test.js'
    ],
    exclude: [
      'src/**/*.swp'
    ],
    preprocessors: {
      'src/test.js': ['webpack']
    },
    webpack: webpack,
    reporters: ['progress'],
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    concurrency: Infinity
  })
}
