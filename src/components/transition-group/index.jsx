import React, { Component, PropTypes } from 'react/addons';
let { CSSTransitionGroup } = React.addons;
import './style.less';

export default class TransitionGroup extends Component {

  static propTypes = {
    children: PropTypes.any,
    path: PropTypes.string
  }

  render() {

    let key = this.props.path;

    return (
      <CSSTransitionGroup
        component='div'
        transitionName='page'
        className='transition-wrapper'
        transitionAppear>
        {React.cloneElement(this.props.children || <div />, { key })}
      </CSSTransitionGroup>
    );
  }

}
