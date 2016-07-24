var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const defaults = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
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
};

const development = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/main'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};

const production = {
  devtool: 'source-map',
  entry: ['./src/main'],

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
};


if (dev) {
  module.exports = Object.assign({}, defaults, development);
} else {
  module.exports = Object.assign({}, defaults, production);
}
