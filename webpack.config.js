const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const GenerateJsonWebpackPlugin = require('generate-json-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const program = path.basename(process.argv[1]);
const mode = program == 'webpack' ? 'production' : 'development';
const JsDocWebpackPlugin = require('jsdoc-webpack4-plugin');
//const TranslateWebpackPlugin = require('./plugins/TranslateWebpackPlugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');


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
                test: /\.md$/,
                use: 'null-loader'
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                loader: 'json5-loader'
            },
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
            root: path.resolve(__dirname, 'src'),
            locales: path.resolve(__dirname, 'locales'),
            mocks: path.resolve(__dirname, 'src', 'mocks'),
            'test-results': path.resolve(__dirname, '.jest-test-results.json')
        }
    },
    plugins: [
        //new TranslateWebpackPlugin({
        //    languages: ['ja'],
        //    files: 'src/Application/**/!(*test|*story|*TestHelper).js',
        //    target: 'src/Application/pages/*'
        //}),
        new CaseSensitivePathsWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Polymer with webpack',
            chunksSortMode: 'none',
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            //Needed for Firefox and Edge
            assets: ['node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'],
            append: false
        }),
        new JsDocWebpackPlugin({
            conf: './jsdoc.config.json'
        }),
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
    node: {
        fs: 'empty'
    }
};


if (program === 'webpack') {
    module.exports.plugins.push(
        new UglifyJSWebpackPlugin({
            sourceMap: true,
            extractComments: true
        })
    );
}
