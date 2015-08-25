import React from 'react';
import History from 'react-router/lib/HashHistory';
import Root from './root';
import 'app/bootscreen.less';

const history = new History();

setTimeout(() => {
  React.render(
    <Root history={history} />,
    document.body
  );
}, 1e3);
