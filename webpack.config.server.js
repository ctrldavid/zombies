var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  entry: './src/server/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  resolve: {
    root: path.resolve('./src')
  },  
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   "screw-ie8": true,
    //   compressor: {
    //     warnings: true,
    //   },
    // }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],  
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src') // Only run on source directory.
    }]
  },
  externals: nodeModules
};
