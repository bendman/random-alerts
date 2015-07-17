import React, { Component } from 'react';
import PageHeader from 'app/components/page-header';
import TimerStore from 'app/store/timers';
import './style.less';

// EXAMPLE TIMER
// this.props.timer = {
//   name: 'Picture a Day',
//   id: 0,
//   timeWindow: {
//     start: '08:00',
//     end: '21:30'
//   },
//   isEnabled: false
// }

export default class TimerEditor extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let timer = TimerStore.get(this.props.params.id);

    let buttonLabel = timer.isEnabled
      ? 'Disable'
      : 'Enable';

    let startTime = timer.timeWindow.start;
    let endTime = timer.timeWindow.end;

    return (
      <div>
        <PageHeader pageTitle={timer.name} />
        <button onClick={this.toggleEnabled.bind(this, timer)}>{buttonLabel}</button>
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

  toggleEnabled(timer) {
    console.info('toggling', timer);
    TimerStore.set(timer.id, {
      isEnabled: !timer.isEnabled
    });
  }

};
