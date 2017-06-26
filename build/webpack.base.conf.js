var webpack = require("webpack");
var path = require("path");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var WebpackHotModule = require('webpack-hot-middleware');
module.exports = {
    //入口文件
    entry: {
        app: './src/app.ts'
    },
    //输出文件
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    output: {
        path: '/build/',
        publicPath: '/build/',
        filename: '[name].js'
    },
    devtool: '#cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.sass$/,
                loader: ['sass-loader', 'style-loader', 'css-loader']
            },
            {
                test: /.(png|jpe?g|svg|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /.(woff2|ttf|eot|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    //自动启动浏览器
    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    ]
};