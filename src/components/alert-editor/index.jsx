import React, { Component } from 'react';
import PageHeader from 'app/components/page-header';
import { connect } from 'redux/react';
import './style.less';

// EXAMPLE ALERT
// this.props.alert = {
//   name: 'Picture a Day',
//   id: 0,
//   timeWindow: {
//     start: '08:00',
//     end: '21:30'
//   },
//   isEnabled: false
// }

@connect(function(state, component) {
  console.log('editor this', this, arguments);
  return {alert: state.alerts[Number(component.params.alertId)]};
})
export default class AlertEditor extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.info('alert editor', this);

    let alert = this.props.alert;

    let buttonLabel = alert.isEnabled
      ? 'Disable'
      : 'Enable';

    let startTime = alert.timeWindow.start;
    let endTime = alert.timeWindow.end;

    return (
      <div>
        <PageHeader pageTitle={alert.name} />
        <button onClick={this.toggleEnabled.bind(this, alert)}>{buttonLabel}</button>
        <label>
          Start Window
          <input type="time" name="start_time_window" value={startTime} />
        </label>
        <label>
          End Window
          <input type="time" name="end_time_window" value={endTime} />
        </label>
      </div>
    );

  }

  toggleEnabled(alert) {
    console.info('toggling', alert);
    AlertStore.set(alert.id, {
      isEnabled: !alert.isEnabled
    });
  }

};
