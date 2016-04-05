import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from '../components/Home';

const routes = (
  <Route>
    <Route path="/" component={Home} />
  </Route>
);

export { routes };
