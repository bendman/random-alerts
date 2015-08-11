import React from 'react';
import History from 'react-router/lib/HashHistory';
import Root from './root';

const history = new History();

React.render(
  <Root history={history} />,
  document.body
);
