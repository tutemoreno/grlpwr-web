import { Box, Grid, Grow, makeStyles, Typography } from '@material-ui/core';
import {
  BarcodeScan,
  CardAccountDetailsOutline,
  PlaylistCheck,
  WeightLifter,
} from 'mdi-material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { Login } from '../components';

const useStyles = makeStyles(({ palette, spacing }) => ({
  gridHeader: {
    color: palette.text.secondary,
    backgroundColor: '#979733',
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
      <Box
        className={classes.gridHeader}
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
      >
        <Box display="flex" p={2} alignItems="center">
          <Typography component="h1" variant="h3" className={classes.title}>
            Fit
          </Typography>
          <WeightLifter className={classes.gridStepIcon} />
          <Typography component="h1" variant="h3" className={classes.title}>
            ool
          </Typography>
        </Box>
        <Box px={2}>
          <Typography component="h1" variant="h5" className={classes.subtitle}>
            For athletes by athletes
          </Typography>
        </Box>
        <Grow in={true} timeout={1000}>
          <Box mt={3}>
            <Login />
          </Box>
        </Grow>
      </Box>
      <Grid className={classes.gridBody} container justifyContent="center">
        <GridItemStep
          icon={<BarcodeScan className={classes.gridStepIcon} />}
          title="Escaneo"
          description="Escanee mediante código de barras para cargar la información del
              tubo"
        />

        <GridItemStep
          icon={<CardAccountDetailsOutline className={classes.gridStepIcon} />}
          title="Paciente"
          description="Escanee el DNI o ingrese los datos del paciente de forma manual"
        />

        <GridItemStep
          icon={<PlaylistCheck className={classes.gridStepIcon} />}
          title="Envío"
          description="Envíe toda la información que se cargará automáticamente en el LIS"
        />
      </Grid>
    </>
  );
}

function GridItemStep({ icon, title, description }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} lg={3} className={classes.gridStep}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {icon}
        <Typography component="h1" variant="h5" className={classes.stepTitle}>
          {title}
        </Typography>
        <Typography component="h1">{description}</Typography>
      </Box>
    </Grid>
  );
}
GridItemStep.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
