import React, { PropTypes, Component } from 'react/addons';
import 'purecss';
import 'app/style.less';
import TransitionGroup from 'app/components/transition-group';

function isHome(path) {
  if (path && path.indexOf('alerts/') === -1) { return true; }
  return false;
}

export default class Application extends Component {

  static propTypes = {
    children: PropTypes.any,
    location: PropTypes.any.isRequired
  }

  constructor(props, context) {
    super(props, context);
  }

  componentDidUpdate() {
    this.oldPath = this.props.location.pathname;
  }

  componentWillMount() {
    this.oldPath = this.props.location.pathname;
  }

  render() {
    let src = this.oldPath;
    let dest = this.props.location.pathname;
    let transition = 'page-none';

    if (!isHome(dest) && isHome(src)) {
      transition = 'page-next';
    } else if (isHome(dest) && !isHome(src)) {
      transition = 'page-back';
    }

    return (
      <TransitionGroup
        name={transition}
        path={this.props.location.pathname}>
        {this.props.children}
      </TransitionGroup>
    );
  }
}
