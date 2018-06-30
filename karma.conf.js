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
      //'src/**/*.js': ['sourcemap', 'webpack', 'coverage'], //This increases testing time
    },
    webpack: webpack,
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
