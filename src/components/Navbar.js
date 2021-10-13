import {
  AppBar,
  Box,
  Button,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from './';
import { makeStyles } from '@mui/styles';
import Menu from 'mdi-material-ui/Menu';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuth } from '../context';
import { CSSTransition } from 'react-transition-group';
import '../styles/Navbar.scss';

const useStyles = makeStyles(() => ({
  toolbar: {
    backgroundColor: '#979733',
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const { user, signOut } = useAuth();

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton color="inherit">
              <Menu />
            </IconButton>
            {user && (
              <>
                <Box clone px={2}>
                  <Typography variant="h6">{user.username}</Typography>
                </Box>
                <Button
                  variant="contained"
                  type="button"
                  color="secondary"
                  onClick={signOut}
                >
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <CSSTransition classNames="toolbar" timeout={300} in={!trigger}>
      {children}
    </CSSTransition>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};
