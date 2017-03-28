import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from 'react-redux';
import _styles from './Flights.css';

class Flights extends Component {
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
        <Helmet title="Search Flights" />

        <span>{this.props.text}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const flights = state.search.flights;

  return {
    text: flights.text,
  };
};

export default connect(mapStateToProps)(Flights);
