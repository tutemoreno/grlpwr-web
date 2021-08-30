import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route as PublicRoute,
  Switch,
} from 'react-router-dom';
import { Home } from '../views';

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
