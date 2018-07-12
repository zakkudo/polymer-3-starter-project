const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    webpackConfig.devtool = 'eval';

    // lib/fetch is mocked, but lib/fetch.js is not mocked to allow access
    // to the original module.
    webpackConfig.plugins.push(new webpack.NormalModuleReplacementPlugin(
        /lib\/fetch$/,
        path.resolve(__dirname, 'src', 'mocks', 'fetch.js')
    ));

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
        webpack: webpackConfig,
        reporters: ['progress', 'json-result'],
        jsonResultReporter: {
            outputFile: ".karma-test-results.json",
            isSynchronous: true
        },
        colors: true,
        logLevel: config.LOG_ERROR,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        concurrency: Infinity
    })
}
