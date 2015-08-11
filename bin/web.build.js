var webpack = require('webpack');
var config = require('../webpack.config');

// Remove hot loading things
config.entry = config.entry.pop();
config.plugins = [];

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
