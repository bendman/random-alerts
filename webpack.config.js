var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist/build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // , new webpack.NoErrorsPlugin()
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
      loaders: ['style', 'css']
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.(ttf|svg|woff|gif|jpe?g|png)$/,
      loaders: ['file']
    }]
  }
};
