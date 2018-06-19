const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    GenerateJsonWebpackPlugin = require('generate-json-webpack-plugin'),
    WriteFileWebpackPlugin = require('write-file-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin'),
    program = path.basename(process.argv[1]),
    mode = program == 'webpack' ? 'production' : 'development';

console.log('Webpack mode: ', mode);

module.exports = {
    devtool: 'source-map',
    mode: mode,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'src', 'lib'),
            '@polymer': path.resolve(__dirname, 'node_modules', '@polymer')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Polymer with webpack'
        }),
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
    ]
};


if (program === 'webpack') {
    module.exports.plugins.push(
        new UglifyJSWebpackPlugin({
            sourceMap: true,
            extractComments: true
        })
    );
}
