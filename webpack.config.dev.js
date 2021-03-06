// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: '#cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/public/main'
  ],
  resolve: {
    root: path.resolve('./src')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
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
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
