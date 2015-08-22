var webpack = require('webpack');
var config = require('../webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Remove hot loading things
config.entry = config.entry.pop();
config.plugins = [
  new ExtractTextPlugin('[name].bundle.css')
];

// Build the web project
function build(optConfig, callback) {
  if (!optConfig) {
    optConfig = config;
  }
  webpack(optConfig, function(err, stats) {
    if (err) {
      console.log('ERR:', err);
    }
    console.log(stats.toString({
      colors: true
    }));
    console.log('DONE!');
    if (typeof callback === 'function') {
      callback(err, stats);
    }
  });
}


if (require.main === module) {
  build();
} else {
  module.exports = build;
}
