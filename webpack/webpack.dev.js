const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '../dist',
		historyApiFallback: true,
		port: 8002,
		proxy: {
			'/api': {
				target: 'http://localhost:5002',
				secure: false
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin ({
			title: 'React JS - Development',
			favicon: path.join(__dirname, '../src/assets/images/favicon.ico'),
			template:path.join(__dirname, '../public/index.html'),
			inject: 'body'
		})
	]
})