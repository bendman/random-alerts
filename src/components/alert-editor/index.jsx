import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import * as AlertActions from 'app/actions';
import './style.less';

@connect(function(state, component) {
  let targetId = Number(component.params.alertId);
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

    let startTime = alert.timeWindow.start;
    let endTime = alert.timeWindow.end;

    let toggleText, toggleHandler;
    if (alert.isEnabled) {
      toggleText = 'Disable';
      toggleHandler = this.onDisable;
    } else {
      toggleText = 'Enable';
      toggleHandler = this.onEnable;
    }

    return (
      <div>
        <input
          type='text'
          value={alert.name}
          onChange={this.onNameChange.bind(this)} />
          <button onClick={toggleHandler.bind(this, alert)}>
            {toggleText}
          </button>
        <label>
          Start
          <input type='time' name='start_time_window' value={startTime} />
        </label>
        <label>
          End
          <input type='time' name='end_time_window' value={endTime} />
        </label>
        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
      </div>
    );

  }

  onDisable() {
    this.props.dispatch(AlertActions.disable_alert(this.props.alert.id));
  }

  onEnable() {
    this.props.dispatch(AlertActions.enable_alert(this.props.alert.id));
  }

  onNameChange(e) {
    this.props.dispatch(AlertActions.name_alert(this.props.alert.id, e.target.value));
  }

  onDeleteClick() {
    this.context.router.transitionTo('/alerts');
    this.props.dispatch(AlertActions.delete_alert(this.props.alert.id));
  }

}
