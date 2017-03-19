import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from 'react-redux';
import _styles from './Hotels.scss';

class Hotels extends Component {
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
        <Helmet title="Search Hotels" />

        <span>{this.props.text}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const hotels = state.search.hotels;

  return {
    text: hotels.text,
  };
};

export default connect(mapStateToProps)(Hotels);
