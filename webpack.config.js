var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist/build'),
    filename: '[name].bundle.js',
    publicPath: '/js/',
    chunkFilename: '[id].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].bundle.css')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'app': path.join(__dirname, 'src')
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel', 'eslint'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader!less-loader')
    }, {
      test: /\.(ttf|svg|woff|gif|jpe?g|png)$/,
      loader: 'url?limit=10000'
    }]
  },
  cssnext: {
    browsers: [
      '> 1%',
      'android > 2'
    ]
  }
};
