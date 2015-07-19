import React, { PropTypes, Component } from 'react';
import { Router, Route, Redirect } from 'react-router';

import { Provider } from 'redux/react';
import { createRedux } from 'redux';
import * as stores from 'app/stores';

import Application from 'app/components/application';
import AlertList from 'app/components/alert-list';
import AlertEditor from 'app/components/alert-editor';

const redux = createRedux(stores);

export default class Root extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const history = this.props.history;

    return (
      <Provider redux={redux}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );
  }

}

function renderRoutes(history) {
  return (
    <Router history={history}>
      <Route component={Application}>
        <Route path='alerts' component={AlertList} />
        <Route name='editor' path='alerts/:alertId' component={AlertEditor} />
        <Redirect from='/' to='alerts' />
      </Route>
    </Router>
  );
}
