import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route as PublicRoute,
  Switch,
} from 'react-router-dom';
import { Home } from '../views';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

// background: rgb(0,0,0);
// background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(121,9,121,1) 35%);

const useStyles = makeStyles(({ palette }) => ({
  appBackground: {
    background: `linear-gradient(${palette.common.black}, ${palette.pink[500]})`,
  },
}));

export const AppRouter = () => {
  const classes = useStyles();

  return (
    <Router>
      <Box className={classes.appBackground}>
        <Switch>
          <PublicRoute exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Box>
    </Router>
  );
};
