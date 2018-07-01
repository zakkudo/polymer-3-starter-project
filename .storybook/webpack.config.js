const path = require("path");
const webpackConfig = require('../webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
    const module = storybookBaseConfig.module;

    module.rules = webpackConfig.module.rules;

    Object.assign(storybookBaseConfig, {
        devtool: 'source-map',
        resolve: webpackConfig.resolve,
    });

    storybookBaseConfig.plugins.push(
        new WriteFileWebpackPlugin({})
    );

    storybookBaseConfig.plugins.push(
        new CopyWebpackPlugin([{
            from: 'node_modules/@webcomponents/webcomponentsjs',
            to: storybookBaseConfig.output.path + '/webcomponentsjs/'
        }])
    );

    return storybookBaseConfig;
};
