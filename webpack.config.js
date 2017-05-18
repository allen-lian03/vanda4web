'use strict'

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
    var prd = env === 'prd'
    function resolve(dir) {
        return path.join(__dirname, dir)
    }
    return {
        entry: {
            app: './web/main.js'
        },

        output: {
            path: path.join(__dirname, 'dist/web'),
            filename: '[name].js',
            publicPath: ''
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1
                }
            }),

            new ExtractTextPlugin({filename: "[name].css", allChunks: true}),
            new HtmlWebpackPlugin({title: 'Vanda for Web', template: './web/index.html'}),
            new CleanWebpackPlugin([resolve('dist')])
        ],

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    include: [ resolve('web/components') ],
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: 'css-loader',
                                fallback: 'style-loader'
                            })
                        }
                    }
                },

                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [ resolve('web') ]
                },

                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: "css-loader"
                    }),
                    include: [ resolve('web/css') ]
                }
            ]
        }
    }
}