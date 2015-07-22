/* eslint-env mocha */

var jsdom = require('./setup');
var assert = require('assert');
var expect = require('chai').expect;
var React = require('react');
require('react/addons');
var TestUtils = React.addons.TestUtils;

describe.skip('Alert List Page', function() {

  describe('Global Nav', function() {
    it('shows the page title', function() {});
  });

  describe('List', function() {
    it('shows the current alerts', function() {});
    it('goes to alert when alerts are clicked', function() {});
  });

});

describe.skip('Alert List Page', function() {

  describe('Global Nav', function() {
    it('shows the page title', function() {});
    it('has a back button', function() {});
    it('goes back when clicking the back button', function() {});
  });

  describe('Title', function() {
    it('shows the current value', function() {});
  });

});

describe.skip('Router', function() {
  it('goes to the alert list by default', function() {});
  it('shows the alert editor when :id is provided', function() {});
  it('updates alert editor when :id is changed', function() {});
  it('goes to the alert list if a false :id is provided', function() {});
});
