import React, { Component, PropTypes } from 'react/addons';
// import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
let { CSSTransitionGroup } = React.addons;
import './style.less';

export default class TransitionGroup extends Component {

  static propTypes = {
    children: PropTypes.any,
    path: PropTypes.string,
    name: PropTypes.any.isRequired
  }

  render() {

    let key = this.props.path;

    return (
      <CSSTransitionGroup
        component='div'
        transitionName={this.props.name}
        className='transition-wrapper'
        >
        {React.cloneElement(this.props.children || <div />, { key })}
      </CSSTransitionGroup>
    );
  }

}
