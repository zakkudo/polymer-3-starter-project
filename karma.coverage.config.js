process.env.NODE_ENV = 'testing';

const webpack = require('./webpack.config.js'),
    setDefaults = require('./karma.test.config.js'),
    path = require('path');

module.exports = function(config) {
    setDefaults(config);

    webpack.module.rules.push({
        test: /\.js$/,
        use: {
            loader: 'istanbul-instrumenter-loader',
            options: {
                esModules: true,
            },
        },
        exclude: [
            /node_modules/,
            /test\.js$/,
            'test-results', // Don't test test results
            /TestHelper\.js/, // Don't test test helpers
            /Page\.js/, // Don't test test helpers
            /Application\/index.js/
        ],
    });

    webpack.module.rules.push({
        test: /\.md$/,
        use: 'null-loader'
    });

    config.set({
        webpack: webpack,
        preprocessors: {
            'src/test.js': ['webpack', 'sourcemap']
        },
        reporters: [ 'progress', 'coverage-istanbul' ],
        coverageIstanbulReporter: {
            reports: ['html', 'text-summary' ],
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: false
        }
    });
};
