var Promise = require('bluebird');
var execAsync = Promise.promisify(require('child_process').exec);
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var buildAsync = Promise.promisify(require('./web.build'));

var BUILD_CMD = 'cordova build';
var CORDOVA_DIR = path.resolve(__dirname, '../cordova');

// Setup the config
var webpackConfig = require('../webpack.config.js');
// Remove hot loading things
webpackConfig.entry = path.resolve(__dirname, '../src/index.cordova.jsx');
webpackConfig.plugins = [];

// Run a web build
console.log('\nBUILDING WEB PROJECT\n');
buildAsync(null)

  // Read built entry file
  .then(function(stats) {
    console.log('\nREADING CONTENT OF BUILT WEB PROJECT\n');
    var mainFile = path.resolve(
      webpackConfig.output.path,
      webpackConfig.output.filename
    );
    return fs.readFileAsync(mainFile);
  })

  // Copy file to cordova
  .then(function(entryContent) {
    console.log('\nCOPYING MAIN ENTRY FILE TO CORDOVA PROJECT\n');
    var targetFile = path.resolve(CORDOVA_DIR, 'www/js/build.js');
    return fs.writeFileAsync(targetFile, entryContent);
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
