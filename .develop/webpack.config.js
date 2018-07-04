const path = require("path");
const webpackConfig = require('../webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const JsDocWebpackPlugin = require('jsdoc-webpack4-plugin');

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
    const module = storybookBaseConfig.module;

    module.rules = webpackConfig.module.rules;

    module.rules.push({
        test: /story\.js?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
    });

    Object.assign(storybookBaseConfig, {
        devtool: 'source-map',
        resolve: webpackConfig.resolve,
        stats: "errors-only",
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

    storybookBaseConfig.plugins.push(
        new CopyWebpackPlugin([{
            from: 'documentation',
            to: storybookBaseConfig.output.path + '/documentation/'
        }])
    );

    /*
    storybookBaseConfig.plugins.push(
        new JsDocWebpackPlugin({
            conf: './jsdoc.config.json'
        })
    );
    */

    storybookBaseConfig.plugins.push(
        new OpenBrowserWebpackPlugin({ url: 'http://localhost:6006' })
    );

    return storybookBaseConfig;
};
