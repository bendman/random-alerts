import React, { PropTypes, Component } from 'react/addons';
import 'purecss';
import 'app/style.less';
import TransitionGroup from 'app/components/transition-group';

export default class Application extends Component {

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.any.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <TransitionGroup path={this.props.location.pathname}>
        {this.props.children}
      </TransitionGroup>
    );
  }
}
