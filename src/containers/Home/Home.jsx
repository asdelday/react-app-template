import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { connect } from 'react-redux';
import _styles from './Home.css';

export class Home extends Component {
  static propTypes = {
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
        <Helmet title="Home" />

        <div className={styles.container}>
          <h2>Template for creating React + Redux universal applications</h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(Home);
