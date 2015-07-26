import React, { PropTypes, Component } from 'react';
import 'purecss';
import 'app/style.less';

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
        {this.props.children}
      </div>
    );
  }

}
