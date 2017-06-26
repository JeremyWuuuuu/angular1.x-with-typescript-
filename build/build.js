process.env.NODE_ENV = 'production'

var path = require('path')
var webpack = require('webpack')
var config = reuqire('../config')
var webpackConfig = reuqire('./webpack.prod.conf')
var rm = require('rimraf')


rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
	if (err) throw err
	webpack(webpackConfig, (err, stats) => {
		if (err) throw err
		process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chinkModules: false
		}) + '\n\n')

	console.log('Build Completed. \n')
	})
})

