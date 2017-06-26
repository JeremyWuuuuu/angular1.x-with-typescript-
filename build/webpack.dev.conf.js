var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseConfig, {
    output: {
        path: '/build/',
        publicPath: '/build/',
        filename: '[name].js'
    },
    devtool: '#cheap-module-eval-source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
})