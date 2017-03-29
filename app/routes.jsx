import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, Home } from 'containers';
import { Cars, Flights, Hotels } from 'search/containers';
import { NotImplementedYet } from 'not-implemented-yet/containers';

/**
 * Please keep routes in alphabetical order
 * @returns {object} Routes object
 */
const getRoutes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="cars" component={Cars} />
    <Route path="flights" component={Flights} />
    <Route path="hotels" component={Hotels} />

    {/* Catch all route */}
    <Route path="*" component={NotImplementedYet} />
  </Route>
);

export default getRoutes;
