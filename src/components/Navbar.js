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

const useStyles = makeStyles(({ palette }) => ({
  toolbar: { backgroundColor: palette.common.black },
  title: { flexGrow: 1 },
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
      <Toolbar className={classes.toolbar} />
    </>
  );
};

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return <Slide in={!trigger}>{children}</Slide>;
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};
