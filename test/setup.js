var jsdom = require('mocha-jsdom');

// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope for React to access in tests
// global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
// global.window = document.parentWindow;

module.exports = jsdom;
