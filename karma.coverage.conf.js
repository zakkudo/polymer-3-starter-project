const webpack = require('./webpack.config.js'),
    setDefaults = require('./karma.test.conf.js');

module.exports = function(config) {
    setDefaults(config);

    config.set({
        preprocessors: {
            'src/**/*test.js': ['webpack'],
            'src/**/*.js': ['sourcemap', 'webpack', 'coverage'],
        },
        reporters: ['progress', 'coverage'],
    });
};
