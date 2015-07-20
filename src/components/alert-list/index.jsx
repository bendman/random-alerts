import { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'redux/react';
import * as AlertActions from 'app/actions';

@connect(function(state) {
  return { alerts: state.alerts };
})
export default class AlertList extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    console.log('alertList this', this, AlertActions);

    const alerts = this.props.alerts.map((alert) => {
      const classes = alert.isEnabled ? 'enabled' : 'disabled';
      return (
        <li key={alert.id} className={classes}>
          <Link to={`alerts/${alert.id}`}>{alert.name}</Link>
        </li>
      );
    });

    return (
      <div>
        <div>
          <button
            onClick={this.onNewClick.bind(this)}>
            New
          </button>
        </div>
        <ul>
          {alerts}
        </ul>
      </div>
    );
  }

  onNewClick() {
    console.log('dispatched', this.props.dispatch(AlertActions.add_alert()));
    console.log('this.props.alerts', this.props.alerts);
    // TODO this should redirect to the newest alert
    // let newId = this.props.alerts;
    // this.context.router.transitionTo(`/alerts/${newId}`);
  }

}
