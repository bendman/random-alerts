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

function copyFileAsync(src, dest) {
  console.log('copying: \n\tfrom ' + src + '\n\tto   ' + dest);
  return fs.readFileAsync(path.resolve(src))
    .then(function(content) {
      return fs.writeFileAsync(path.resolve(dest), content);
    });
}

// Run a web build
console.log('\nBUILDING WEB PROJECT\n');
buildAsync(null)

  // Copy built files into cordova project
  .then(function() {
    console.log('\nCOPYING CONTENT OF BUILT WEB PROJECT\n');
    var mainSource = path.join(
      webpackConfig.output.path, webpackConfig.output.filename
    );
    var mainTarget = path.join(
      CORDOVA_DIR, 'www/js/', webpackConfig.output.filename
    );
    return Promise.all([
      copyFileAsync(mainSource, mainTarget),
      copyFileAsync(mainSource + '.map', mainTarget + '.map')
    ]);
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
