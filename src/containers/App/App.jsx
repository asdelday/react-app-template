import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import config from 'config';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import _styles from './App.scss';
import logo from './logo.png';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    styles: PropTypes.object,
  };

  static defaultProps = {
    styles: _styles,
  };

  render() {
    const { children, className, styles } = this.props;

    return (
      <div className={cx(className, styles.root)}>
        <Helmet {...config.app.head} />
        <Helmet title="Home" />

        <header className={cx(styles.header)}>
          <nav className={cx(styles.nav)}>
            <IndexLink to="/">
              <img src={logo} alt="react - logo" className={cx(styles.logo)} />
            </IndexLink>
            <Link
              className={cx(styles.nav__item)}
              activeClassName={cx(styles['nav__item--active'])}
              to="/flights"
            >
              Flights
            </Link>
            <Link
              className={cx(styles.nav__item)}
              activeClassName={cx(styles['nav__item--active'])}
              to="/hotels"
            >
              Hotels
            </Link>
            <Link
              className={cx(styles.nav__item)}
              activeClassName={cx(styles['nav__item--active'])}
              to="/cars"
            >
              Cars
            </Link>
          </nav>
        </header>

        <div className={cx(styles.brand)}>
          <h1>Title</h1>
        </div>

        <div className={cx(styles.container)}>
          {children}
        </div>

        <footer className={cx(styles.footer)}>
          Rodrigo Ortega Cuesta
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(App);
