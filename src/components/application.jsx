import React, { PropTypes, Component } from 'react';

export default class Application extends Component {

  static propTypes = {
    children: PropTypes.any
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <h1>application.jsx</h1>
        {this.props.children}
      </div>
    );
  }

}
