import React, { Component } from 'react';
import Router, { Route, RouteHandler, DefaultRoute } from 'react-router';
import AppHeader from 'app/components/app-header';
import TimerList from 'app/components/timer-list';
import TimerEditor from 'app/components/timer-editor';
import TimerStore from 'app/store/timers';
import 'purecss';

function wrapState(Component) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        timers: TimerStore.get()
      };
    }
    render() {
      console.log('wrap props', this.props);
      return (<Component params={this.props.params} timers={this.state.timers} />);
    }
  };
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timers: TimerStore.get()
    };
  }

  render() {
    return (
      <div>
        <AppHeader />
        <RouteHandler />
      </div>
    );
  }

};

export default (
  <Route handler={App}>
    <DefaultRoute
      name='home'
      handler={wrapState(TimerList)}
    />
    <Route
      name='timerEditor'
      path='/timers/:id'
      handler={wrapState(TimerEditor)}
    />
  </Route>
);
