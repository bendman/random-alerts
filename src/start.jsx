import React from 'react';
import Router from 'react-router';
import routes from 'app/components/router';
import App from 'app';

App.router = Router.run(routes, Handler => {
  React.render(<Handler />, document.body)
});
