const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
    GenerateJsonWebpackPlugin = require('generate-json-webpack-plugin'),
    WriteFileWebpackPlugin = require('write-file-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin'),
    {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin'),
    program = path.basename(process.argv[1]),
    mode = program == 'webpack' ? 'production' : 'development',
    JsDocWebpackPlugin = require('jsdoc-webpack4-plugin');

module.exports = {
    devtool: 'source-map',
    mode: mode,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            /* Babel isn't needed for current browsers
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            */
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            application: path.resolve(__dirname, 'src', 'Application'),
            lib: path.resolve(__dirname, 'src', 'lib'),
            'test-results': path.resolve(__dirname, '.jest-test-results.json')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Polymer with webpack'
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            //Needed for Firefox and Edge
            assets: ['node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'],
            append: false
        }),
        /*
        new JsDocWebpackPlugin({
            conf: './jsdoc.config.json'
        }),
        */
        new BaseHrefWebpackPlugin({baseHref: '/'}),
        new WriteFileWebpackPlugin({
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new GenerateJsonWebpackPlugin('search.json', {
            hits: [{
                'key': 'Carrot',
                'count': 3
            }, {
                'key': 'Beef',
                'count': 2
            }, {
                'key': 'Celary',
                'count': 0
            }, {
                'key': 'Chicken',
                'count': 10
            }, {
                'key': 'Lettuce',
                'count': 2
            }]
        })
    ],
    devServer: {
        historyApiFallback: true,
        open: true
    },
    stats: "errors-only",
};


if (program === 'webpack') {
    module.exports.plugins.push(
        new UglifyJSWebpackPlugin({
            sourceMap: true,
            extractComments: true
        })
    );
}
