/* eslint-env mocha */

var jsdom = require('./setup');
var assert = require('assert');
var expect = require('chai').expect;
var React = require('react');
require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('Alert Controller', function() {
  var AlertController = require('app/controllers/alerts');

  it('fetches from localstorage', function() {});
  it('saves to localstorage', function() {});
  it('updates alerts for tomorrow', function() {});

});
