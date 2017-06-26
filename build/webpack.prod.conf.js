var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('../config')
var baseConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

  var webpackConfig = merge(baseConfig, {
  	output: {
  		path: config.build.assetsRoot,
  		filename: '../dist/[name].[chunkhash].js',
  		chunkFilename: '../dist/[id].[chunkhash].js'
  	},
  	plugins: [
  		new webpack.optimize.UglifyJsPlugin({
  			compress: {
  				warning: false
  			},
  			sourceMap: true
  		}),
  		new HtmlWebpackPlugin({
  			filename: process.env.NODE_ENV === 'testing'
  				? 'index.html'
  				: config.build.index,
  			template: 'index.html',
  			inject: true,
  			minify: {
  				removeComments: true,
  				collapseWhitespace: true,
  				removeAttributeQuetes: true
  			},
  			chunkSortMode: 'dependency'
  		}),
  		new webpack.optimize.CommonsChunkPlugin({
  			name: 'vendor',
  			minChunks: function(module, count) {
  				return (
  					module.resource && 
  					/\.js$/.test(module.resource) &&
  					module.resource.indexOf(
  							path.join(__dirname, '../node_modules')
  						) === 0
  					)
  			}
  		}),
  		new webpack.optimize.CommonsChunkPlugin({
  			name: 'manifest',
  			chunks: ['vendor']
  		})
  	]
  })

if (config.build.productionGzip) {
	var CompressionWebpackPlugin = require('compression-webpack-plugin')

	webpackConfig.plugins.push(
		new CompressionWebpackPlugin{
			assets: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' + 
				config.build.productionGzipExtensions.join('|') +
				')$'
				),
			threshold: 10240,
			minRatio: 0.8
		})
}

module.exports = webpackConfig