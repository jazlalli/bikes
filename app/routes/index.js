import React from 'react';
import { Route } from 'react-router';

import Home from '../components/Home';

const routes = (
  <Route>
    <Route path="/" component={Home} />
  </Route>
);

export { routes };
