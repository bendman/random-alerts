import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
// import PageHeader from 'app/components/page-header';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';

@connect(function(state) {
  return { alerts: state.alerts };
})
export default class AlertList extends Component {

  render() {
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
        <ul>
          {alerts}
        </ul>
      </div>
    );
  }

}
