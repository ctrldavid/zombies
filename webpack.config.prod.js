// webpack.config.prod.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: ['./src/public/main'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve('./src')
  },  
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      //"screw-ie8": true,
      compressor: {
        warnings: true,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src') // Only run on source directory.
    },{
      test: /\.svg$/,
      loader: 'url'
    }]
  }
}
