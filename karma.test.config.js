const webpack = require('./webpack.config.js');

module.exports = function(config) {
    webpack.devtool = 'eval';

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
            'src/test.js': ['webpack', 'sourcemap']
        },
        webpack: webpack,
        reporters: ['progress', 'json-result'],
        jsonResultReporter: {
            outputFile: ".test-results.tmp.json",
            isSynchronous: true
        },
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        concurrency: Infinity
    })
}
