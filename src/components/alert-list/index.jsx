import React, { PropTypes, Component } from 'react';
import { connect } from 'redux/react';
import { getNewId } from 'app/stores/alerts';
import * as AlertActions from 'app/actions';
import AppHeader from 'app/components/app-header';
import AlertItem from 'app/components/alert-item';
import './style.less';

@connect(function(state) {
  return { alerts: state.alerts.toJS() };
})
export default class AlertList extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    const alerts = this.props.alerts.map((alert) => {
      return (
        <AlertItem key={alert.id} alertId={alert.id} />
      );
    });

    return (
      <div>
        <AppHeader>
          <h2>Alerts</h2>
        </AppHeader>
        <main>
          <ul>
            {alerts}
          </ul>
          <button onClick={this.onNewClick.bind(this)}
            className='forward-btn'> + </button>
        </main>
      </div>
    );
  }

  onNewClick() {
    this.props.dispatch(AlertActions.add_alert());
    this.context.router.transitionTo(`/alerts/${getNewId()}`);
  }

}
