var Promise = require('bluebird');
var execAsync = Promise.promisify(require('child_process').exec);
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var buildAsync = Promise.promisify(require('./web.build'));
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Setup the config
var webpackConfig = require('../webpack.config.js');
// Remove hot loading things
webpackConfig.entry = path.resolve(__dirname, '../src/index.cordova.jsx');
webpackConfig.plugins = [
  new ExtractTextPlugin('[name].bundle.css')
];
webpackConfig.resolve.extensions = ['', '.cordova.js', '.cordova.jsx', '.js', '.jsx'];

var BUILD_CMD = 'cordova build';
var WEB_SRC_DIR = path.resolve(__dirname, webpackConfig.output.path);
var CORDOVA_DIR = path.resolve(__dirname, '../cordova');
var CORDOVA_SRC_DIR = path.join(CORDOVA_DIR, 'www/js/');

function copyFileAsync(src, dest) {
  console.log('copying: \n\tfrom ' + src + '\n\tto   ' + dest);
  return fs.readFileAsync(path.resolve(src))
    .then(function(content) {
      return fs.writeFileAsync(path.resolve(dest), content);
    });
}

// Run a web build
console.log('\nBUILDING WEB PROJECT\n');
buildAsync(webpackConfig)

  // Read list of build files from web project
  .then(function() {
    console.log('\nREADING CONTENT OF BUILT WEB PROJECT\n');
    return fs.readdirAsync(WEB_SRC_DIR);
  })

  // Copy built files into cordova project
  .then(function(files) {
    console.log('\nCOPYING CONTENT OF BUILT WEB PROJECT\n');
    return Promise.all(
      files.map(function(file) {
        return copyFileAsync(
          path.join(WEB_SRC_DIR, file),
          path.join(CORDOVA_SRC_DIR, file)
        );
      }).concat(copyFileAsync(
        // Add image icon copying to cordova root (for automatic icons)
        // This is passed to https://github.com/AlexDisler/cordova-icon
        path.join(WEB_SRC_DIR, 'icon.png'),
        path.join(CORDOVA_DIR, 'icon.png')
      )).concat(copyFileAsync(
        // Images used outside webpack need to be moved into cordova/www/*
        path.join(WEB_SRC_DIR, 'icon.png'),
        path.resolve(CORDOVA_SRC_DIR, '../img/icon.png')
      ))
    );
  })

  // Run cordova build
  .then(function() {
    console.log('\nBUILDING CORDOVA PROJECT\n');
    return execAsync(BUILD_CMD, { cwd: CORDOVA_DIR });

  // Log output
  }).then(function(stdout) {
    if (stdout instanceof Array) {
      stdout = stdout.join('\n');
    }
    console.log(stdout);
    console.log('DONE!\n');
  });
