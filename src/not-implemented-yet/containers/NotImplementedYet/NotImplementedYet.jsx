import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import _styles from './NotImplementedYet.scss';

class NotImplementedYet extends Component {
  static propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    styles: PropTypes.object,
  };

  static defaultProps = {
    styles: _styles,
  };

  render() {
    const { className, styles } = this.props;

    return (
      <div className={cx(className, styles.root)}>
        <span>{this.props.text}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const text = state.notImplementedYet.text;

  return { text };
};

export default connect(mapStateToProps)(NotImplementedYet);
