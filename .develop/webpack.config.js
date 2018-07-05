const webpackConfig = require('../.demo/webpack.config.js');

module.exports = (...args) => {
    return webpackConfig(...args);
};
