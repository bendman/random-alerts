import React, { Component, PropTypes } from 'react';
import { connect } from 'redux/react';
import * as Actions from 'app/actions';
import AppHeader from 'app/components/app-header';
import { newAlert as createNewAlert } from 'app/stores/alerts';
import Immutable from 'immutable';
import './style.less';

@connect(function(state, component) {
  let props;
  let alertId = component.params.alertId;
  if ((typeof alertId === 'string' || typeof alertId === 'number') &&
    !isNaN(Number(alertId))
  ) {
    // Start with an existing alert, by ID
    props = {
      isNew: false,
      alert: state.alerts
        .filter(alert => alert.get('id') === Number(alertId)).first()
    };
  } else {
    // Create a new alert
    let newAlert = createNewAlert();
    props = {
      isNew: true,
      alert: Immutable.fromJS(newAlert)
    };
  }
  return props;
})
export default class AlertEditor extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  state = {
    alert: this.props.alert
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let alert = this.state.alert.toJS();

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
      <div key={'alert-editor-' + alert.id}>
        <AppHeader>
          {!this.props.isNew && <button onClick={this.onDeleteClick.bind(this)}
            className='right-btn'>Delete</button>}
          <h2>Edit</h2>
        </AppHeader>

        <main>
          <label>
            <span className='input-title'>Title</span>
            <div>
              <input
                type='text'
                value={alert.name}
                onChange={this.onNameChange.bind(this)} />
            </div>
          </label>

          <label>
            <span className='input-title'>Start</span>
            <div>
              <input
                type='time'
                name='start_time_window'
                value={startTime}
                onChange={this.onStartChange.bind(this)}
              />
            </div>
          </label>

          <label>
            <span className='input-title'>End</span>
            <div>
              <input
                type='time'
                name='end_time_window'
                value={endTime}
                onChange={this.onEndChange.bind(this)}
              />
            </div>
          </label>
          <button
            className={'pure-button' + (!alert.isEnabled ? ' button-positive' : '')}
            onClick={toggleHandler.bind(this)}>
            {toggleText}
          </button>
          <footer className='pure-g'>
            <button
              className='pure-button button-negative pure-u-1-2'
              onClick={this.onBackClick.bind(this)}
            >
              Cancel
            </button>
            <button
              className='pure-button button-positive pure-u-1-2'
              onClick={this.onSaveClick.bind(this)}
            >
              Save
            </button>
          </footer>
        </main>
      </div>
    );

  }

  onDisable() {
    this.setState({
      alert: this.state.alert.set('isEnabled', false)
    });
  }

  onEnable() {
    this.setState({
      alert: this.state.alert.set('isEnabled', true)
    });
  }

  onNameChange(e) {
    this.setState({
      alert: this.state.alert.set('name', e.target.value)
    });
  }

  onStartChange(e) {
    let time = e.target.value;
    this.setState({
      alert: this.state.alert.setIn(['timeWindow', 'start'], time)
    });
  }

  onEndChange(e) {
    let time = e.target.value;
    this.setState({
      alert: this.state.alert.setIn(['timeWindow', 'end'], time)
    });
  }

  onSaveClick() {
    if (this.props.isNew) {
      this.props.dispatch(Actions.add_alert(this.state.alert.toJS()));
    } else {
      this.props.dispatch(Actions.update_alert(this.state.alert.toJS()));
    }
    this.context.router.transitionTo('/alerts');
  }

  onDeleteClick() {
    this.context.router.transitionTo('/alerts');
    this.props.dispatch(Actions.delete_alert(this.props.alert.get('id')));
  }

  onBackClick() {
    this.context.router.transitionTo('/alerts');
  }

}
