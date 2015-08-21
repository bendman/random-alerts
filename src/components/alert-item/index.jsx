import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import * as Actions from 'app/actions';
import moment from 'moment';
import './style.less';

@connect(function(state, params) {
  let targetId = Number(params.alertId);
  return {
    alert: state.alerts.toJS().filter(alert => alert.id === targetId)[0]
  };
})
export default class AlertEditor extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let alert = this.props.alert;

    let toggleClass;
    // let toggleHandler;
    if (alert.isEnabled) {
      toggleClass = 'enabled';
      // toggleHandler = this.onDisable;
    } else {
      toggleClass = 'disabled';
      // toggleHandler = this.onEnable;
    }

    let start = moment(alert.timeWindow.start, 'HH:mm').format('h:mm A');
    let end = moment(alert.timeWindow.end, 'HH:mm').format('h:mm A');

    return (
      <li
        className={`alert-item ${toggleClass}`}
        onClick={this.onChoose.bind(this)}>
        <span
          className='alert-name'>{alert.name || 'Unnamed'}</span>
        <span className='alert-times'>
          {start} - {end}
        </span>
      </li>
    );

  }

  onDisable() {
    this.props.dispatch(Actions.disable_alert(this.props.alert.id));
  }

  onEnable() {
    this.props.dispatch(Actions.enable_alert(this.props.alert.id));
  }

  onChoose() {
    this.context.router.transitionTo(`alerts/${this.props.alert.id}`);
  }

}
