import React, { Component } from 'react';
import { Link } from 'react-router';
import PageHeader from 'app/components/page-header';

export default class TimerList extends Component {

  render() {

    let timers = this.props.timers.map((timer) => {
      const classes = timer.isEnabled ? 'enabled' : 'disabled';
      return (
        <li key={timer.id} className={classes}>
          <Link to='timerEditor' params={{ id: timer.id }}>{timer.name}</Link>
        </li>
      );
    });

    return (
      <div>
        <PageHeader pageTitle='List of Timers' />
        <ul>
          {timers}
        </ul>
      </div>
    );

  }

};
