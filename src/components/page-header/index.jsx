import React, { Component } from 'react';
import App from 'app';

export default class PageHeader extends Component {

  render() {

    let backButton = null;

    if (this.props.pageTitle !== 'List of Alerts') {
      backButton = (
        <button onClick={this.goBack.bind(this)}>Back</button>
      );
    }

    return (
      <header>
        {backButton}
        <h2>{this.props.pageTitle}</h2>
      </header>
    );

  }

  goBack() {
    App.router.transitionTo('home');
  }

};
