import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import * as Actions from 'app/actions';
import AppHeader from 'app/components/app-header';
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

        <AppHeader>
          <button onClick={this.onBackClick.bind(this)}
            className='back-btn'> &lt; </button>
          <h2>Edit</h2>
        </AppHeader>

        <main>
          <label>
            <span className='input-title'>Message</span>
            <input
              type='text'
              value={alert.name}
              onChange={this.onNameChange.bind(this)} />
          </label>

          <label>
            <span className='input-title'>Start</span>
            <input
              type='time'
              name='start_time_window'
              value={startTime}
              onChange={this.onStartChange.bind(this)}
            />
          </label>

          <label>
            <span className='input-title'>End</span>
            <input
              type='time'
              name='end_time_window'
              value={endTime}
              onChange={this.onEndChange.bind(this)}
            />
          </label>
          <button
            className={'pure-button' + (!alert.isEnabled ? ' button-positive' : '')}
            onClick={toggleHandler.bind(this, alert)}>
            {toggleText}
          </button>
          <button className='pure-button button-negative' onClick={this.onDeleteClick.bind(this)}>Delete</button>
        </main>
        
      </div>
    );

  }

  onDisable() {
    this.props.dispatch(Actions.disable_alert(this.props.alert.id));
  }

  onEnable() {
    this.props.dispatch(Actions.enable_alert(this.props.alert.id));
  }

  onNameChange(e) {
    this.props.dispatch(Actions.name_alert(this.props.alert.id, e.target.value));
  }

  onDeleteClick() {
    this.context.router.transitionTo('/alerts');
    this.props.dispatch(Actions.delete_alert(this.props.alert.id));
  }

  onStartChange(e) {
    let time = e.target.value;
    this.props.dispatch(Actions.set_alert_start(this.props.alert.id, time));
  }

  onEndChange(e) {
    let time = e.target.value;
    this.props.dispatch(Actions.set_alert_end(this.props.alert.id, time));
  }

  onBackClick() {
    this.context.router.transitionTo('/alerts');
  }

}
