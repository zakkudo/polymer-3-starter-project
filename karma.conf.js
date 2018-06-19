const webpack = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*test.js'
    ],
    exclude: [
      'src/**/*.swp'
    ],
    preprocessors: {
      'src/**/*test.js': ['webpack']
    },
    webpack: webpack,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
