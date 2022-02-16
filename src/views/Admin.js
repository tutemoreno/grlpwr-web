import { Box, Grow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Login } from '../components';

const useStyles = makeStyles(({ palette, spacing }) => ({
  gridHeader: {
    color: palette.text.secondary,
    backgroundColor: palette.deepPurple[500],
  },
  gridBody: {
    backgroundColor: palette.grey[50],
  },
  img: {
    maxWidth: spacing(11),
    maxHeight: spacing(11),
  },
  imgLogo: {
    maxWidth: spacing(9),
    maxHeight: spacing(9),
    marginRight: spacing(2),
  },
  title: {
    fontWeight: 600,
    color: palette.grey[50],
  },
  subtitle: {
    color: palette.grey[50],
  },
  stepTitle: {
    fontWeight: 600,
    margin: spacing(2, 0),
  },
  gridStep: {
    padding: spacing(5),
  },
  gridStepIcon: {
    fontSize: '48px',
  },
  button: {
    fontWeight: 600,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Box display="flex" p={2} alignItems="center">
          <Typography component="h1" variant="h3" className={classes.title}>
            Grl
          </Typography>
          <Typography component="h1" variant="h3" className={classes.title}>
            Pwr
          </Typography>
        </Box>
        <Box px={2}>
          <Typography component="h1" variant="h5" className={classes.subtitle}>
            Bienvenida a tu app
          </Typography>
        </Box>
        <Grow in={true} timeout={1000}>
          <Box mt={3}>
            <Login />
          </Box>
        </Grow>
      </Box>

      {/* <Box style={{ height: '800px' }}></Box> */}
    </>
  );
}
