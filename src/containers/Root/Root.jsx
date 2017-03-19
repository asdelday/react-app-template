import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import getRoutes from 'routes';

export class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.routes = getRoutes(props.store);
  }

  render() {
    const { store, history, children } = this.props;

    return (
      <Provider store={store} key="provider">
        <div>
          <Router history={history} key="router">
            {this.routes}
          </Router>
          {(children || null) && children}
        </div>
      </Provider>
    );
  }
}

export default Root;
