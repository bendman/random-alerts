import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import * as AlertActions from 'app/actions';
import './style.less';

@connect(function(state, component) {
  let targetId = Number(component.params.alertId);
  return { alert: state.alerts.filter(alert => alert.id === targetId)[0] };
})
export default class AlertEditor extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      newName: props.alert.name
    };
  }

  render() {
    console.info('alert editor', this.props.alert);

    let alert = this.props.alert;

    let buttonLabel = alert.isEnabled
      ? 'Disable'
      : 'Enable';

    let startTime = alert.timeWindow.start;
    let endTime = alert.timeWindow.end;

    return (
      <div>
        <input
          type='text'
          value={this.state.newName}
          onChange={this.onNameChange.bind(this)} />
        <button onClick={this.toggleEnabled.bind(this, alert)}>{buttonLabel}</button>
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

  toggleEnabled() {
    // console.info('toggling', alert);
    // AlertStore.set(alert.id, {
    //   isEnabled: !alert.isEnabled
    // });
  }

  onNameChange(e) {
    console.info('changing name', e.target.value);
    this.setState({
      newName: e.target.value
    });
    this.props.dispatch(AlertActions.name_alert(this.props.alert.id, e.target.value));
  }

  onDeleteClick() {
    console.info('NAVIGATION', this);
    this.context.router.transitionTo('/alerts');
    this.props.dispatch(AlertActions.delete_alert(this.props.alert.id));
  }

}
