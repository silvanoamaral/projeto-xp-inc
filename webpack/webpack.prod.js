const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  plugins: [
    new CompressionPlugin({
      exclude: /\/node_modules/,
    }),
    new webpack.DefinePlugin ({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin ({
      title: 'ReactJS - Production',
      favicon: path.join(__dirname, '../src/assets/images/favicon.ico'),
      template:path.join(__dirname, '../public/index.html'),
      inject: 'body'
    })
  ]
})