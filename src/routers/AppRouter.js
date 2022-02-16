import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route as PublicRoute,
  Switch,
} from 'react-router-dom';
import { Admin, Home, Designs } from '../views';

export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/desings" component={Designs} />
        <PublicRoute exact path="/admin" component={Admin} />
        <Redirect to="/Home" component={Home} />
      </Switch>
    </Router>
  );
};
