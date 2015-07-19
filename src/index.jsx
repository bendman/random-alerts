import React from 'react';
import History from 'react-router/lib/HashHistory';
// import Router, { Router, HashLocation } from 'react-router';
import Root from './root';

const history = new History();

React.render(
  <Root history={history} />,
  document.body
);
