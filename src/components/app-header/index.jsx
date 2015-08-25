import React, { Component } from 'react';
import './style.less';

export default class AppHeader extends Component {

  render() {

    return (
      <header className='context-nav'>
        <div className='logo'></div>
        {this.props.children}
      </header>
    );

  }

}
